import React from "react";
import Phaser from "phaser";

export type WorldPanelId = "projects" | "resume" | "about" | "contact";

type PixelWorldProps = {
  onOpenPanel: (id: WorldPanelId) => void;
};

const WORLD = {
  width: 1672,
  height: 941,
};

const hotspots: Array<{
  id: WorldPanelId;
  x: number;
  y: number;
  radius: number;
  label: string;
  labelX: number;
  labelY: number;
  fontSize: string;
  maskWidth: number;
  maskHeight: number;
}> = [
  {
    id: "projects",
    label: "Projects",
    x: 314,
    y: 418,
    labelX: 316,
    labelY: 418,
    radius: 105,
    fontSize: "38px",
    maskWidth: 218,
    maskHeight: 54,
  },
  {
    id: "resume",
    label: "Resume",
    x: 827,
    y: 452,
    labelX: 830,
    labelY: 454,
    radius: 110,
    fontSize: "36px",
    maskWidth: 184,
    maskHeight: 52,
  },
  {
    id: "about",
    label: "About Me",
    x: 1170,
    y: 368,
    labelX: 1168,
    labelY: 368,
    radius: 100,
    fontSize: "34px",
    maskWidth: 206,
    maskHeight: 48,
  },
  {
    id: "contact",
    label: "Contact",
    x: 1380,
    y: 833,
    labelX: 1380,
    labelY: 812,
    radius: 115,
    fontSize: "38px",
    maskWidth: 206,
    maskHeight: 54,
  },
];

const pathNodes = {
  projects: { x: 314, y: 418 },
  leftBank: { x: 442, y: 474 },
  bridgeWest: { x: 610, y: 615 },
  bridgeEast: { x: 760, y: 622 },
  resume: { x: 827, y: 452 },
  centerPath: { x: 1018, y: 472 },
  about: { x: 1170, y: 368 },
  contactNorth: { x: 1228, y: 530 },
  contactMid: { x: 1312, y: 675 },
  contact: { x: 1380, y: 833 },
} satisfies Record<string, { x: number; y: number }>;

type PathNodeId = keyof typeof pathNodes;

const pathEdges: Record<PathNodeId, PathNodeId[]> = {
  projects: ["leftBank"],
  leftBank: ["projects", "bridgeWest"],
  bridgeWest: ["leftBank", "bridgeEast"],
  bridgeEast: ["bridgeWest", "resume"],
  resume: ["bridgeEast", "centerPath"],
  centerPath: ["resume", "about", "contactNorth"],
  about: ["centerPath"],
  contactNorth: ["centerPath", "contactMid"],
  contactMid: ["contactNorth", "contact"],
  contact: ["contactMid"],
};

const hotspotNode: Record<WorldPanelId, PathNodeId> = {
  projects: "projects",
  resume: "resume",
  about: "about",
  contact: "contact",
};

class PortfolioScene extends Phaser.Scene {
  private activeHotspot?: WorldPanelId;
  private currentNode: PathNodeId = "centerPath";
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys?: Record<"W" | "A" | "S" | "D", Phaser.Input.Keyboard.Key>;
  private onOpenPanel?: (id: WorldPanelId) => void;
  private route: Phaser.Math.Vector2[] = [];
  private player?: Phaser.Physics.Arcade.Sprite;
  private targetHotspot?: WorldPanelId;

  constructor() {
    super("PortfolioScene");
  }

  init(data: { onOpenPanel?: (id: WorldPanelId) => void }) {
    this.onOpenPanel = data.onOpenPanel;
  }

  preload() {
    this.load.image("player", "/ruiqi-player.png");
  }

  create() {
    this.cameras.main.setBackgroundColor("rgba(0,0,0,0)");
    this.physics.world.setBounds(0, 0, WORLD.width, WORLD.height);

    this.player = this.physics.add.sprite(pathNodes.centerPath.x, pathNodes.centerPath.y, "player");
    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.21);
    this.player.setSize(170, 430).setOffset(142, 500);
    this.player.setDepth(5);

    this.cursors = this.input.keyboard?.createCursorKeys();
    this.keys = this.input.keyboard?.addKeys("W,A,S,D") as Record<
      "W" | "A" | "S" | "D",
      Phaser.Input.Keyboard.Key
    >;
    this.input.keyboard?.addCapture(["UP", "DOWN", "LEFT", "RIGHT", "W", "A", "S", "D"]);

    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      const targetNode = this.nearestPathNode(pointer.worldX, pointer.worldY);
      this.setRoute(targetNode);
      this.input.keyboard?.resetKeys();
    });

    this.createHotspotLabels();
  }

  update() {
    if (!this.player) return;

    const velocity = new Phaser.Math.Vector2(0, 0);
    const keyboardMoving =
      this.cursors?.left.isDown ||
      this.cursors?.right.isDown ||
      this.cursors?.up.isDown ||
      this.cursors?.down.isDown ||
      this.keys?.A.isDown ||
      this.keys?.D.isDown ||
      this.keys?.W.isDown ||
      this.keys?.S.isDown;

    if (keyboardMoving) {
      this.route = [];
      this.targetHotspot = undefined;
      this.queueKeyboardStep();
    }

    if (this.route.length > 0) {
      const targetPoint = this.route[0];
      const distance = Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        targetPoint.x,
        targetPoint.y,
      );

      if (distance < 12) {
        this.player.setPosition(targetPoint.x, targetPoint.y);
        this.route.shift();
        this.currentNode = this.nearestPathNode(this.player.x, this.player.y);
        if (this.route.length === 0) {
          this.triggerArrivedHotspot();
        }
      } else {
        velocity.set(targetPoint.x - this.player.x, targetPoint.y - this.player.y);
      }
    }

    velocity.normalize().scale(310);
    this.player.setVelocity(velocity.x, velocity.y);
    this.player.setFlipX(velocity.x < -1);

    if (this.route.length > 0) this.activeHotspot = undefined;
  }

  private queueKeyboardStep() {
    if (!this.player || this.route.length > 0) return;

    const desired = new Phaser.Math.Vector2(0, 0);
    if (this.cursors?.left.isDown || this.keys?.A.isDown) desired.x = -1;
    if (this.cursors?.right.isDown || this.keys?.D.isDown) desired.x = 1;
    if (this.cursors?.up.isDown || this.keys?.W.isDown) desired.y = -1;
    if (this.cursors?.down.isDown || this.keys?.S.isDown) desired.y = 1;
    if (desired.lengthSq() === 0) return;
    desired.normalize();

    const current = pathNodes[this.currentNode];
    let best: { node: PathNodeId; score: number } | undefined;

    pathEdges[this.currentNode].forEach((candidate) => {
      const next = pathNodes[candidate];
      const direction = new Phaser.Math.Vector2(next.x - current.x, next.y - current.y).normalize();
      const score = direction.dot(desired);
      if (!best || score > best.score) {
        best = { node: candidate, score };
      }
    });

    if (best && best.score > 0.25) {
      this.setRoute(best.node);
    }
  }

  private setRoute(targetNode: PathNodeId) {
    if (!this.player) return;
    this.currentNode = this.nearestPathNode(this.player.x, this.player.y);
    this.targetHotspot = this.hotspotForNode(targetNode);
    const nodeRoute = this.shortestPath(this.currentNode, targetNode);
    this.route = nodeRoute.slice(1).map((node) => new Phaser.Math.Vector2(pathNodes[node].x, pathNodes[node].y));
    if (this.route.length === 0) {
      this.triggerArrivedHotspot();
    }
  }

  private triggerArrivedHotspot() {
    if (!this.player || !this.targetHotspot) return;
    const target = this.targetHotspot;
    const node = hotspotNode[target];
    this.targetHotspot = undefined;
    this.activeHotspot = target;
    this.currentNode = node;
    this.route = [];
    this.player.setVelocity(0, 0);
    this.player.setPosition(pathNodes[node].x, pathNodes[node].y);
    this.onOpenPanel?.(target);
  }

  private hotspotForNode(node: PathNodeId): WorldPanelId | undefined {
    return (Object.keys(hotspotNode) as WorldPanelId[]).find((id) => hotspotNode[id] === node);
  }

  private startLabelBounce(label: Phaser.GameObjects.Text, baseY: number, delay: number) {
    this.tweens.add({
      targets: label,
      y: baseY - 7,
      duration: 520,
      delay,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }

  private createHotspotLabels() {
    hotspots.forEach((spot, index) => {
      const baseY = spot.labelY;
      const mask = this.add.graphics().setDepth(7);
      const maskX = spot.labelX - spot.maskWidth / 2;
      const maskY = spot.labelY - spot.maskHeight / 2;
      mask.fillStyle(0xc8924d, 0.96);
      mask.fillRoundedRect(maskX, maskY, spot.maskWidth, spot.maskHeight, 9);
      mask.lineStyle(3, 0x75451e, 0.7);
      mask.strokeRoundedRect(maskX, maskY, spot.maskWidth, spot.maskHeight, 9);

      const label = this.add
        .text(spot.labelX, spot.labelY, spot.label.toUpperCase(), {
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: spot.fontSize,
          fontStyle: "bold",
          color: "#3a1b0a",
          stroke: "#b57932",
          strokeThickness: 2,
          shadow: {
            offsetX: 1,
            offsetY: 2,
            color: "#6d3a16",
            blur: 0,
            fill: true,
          },
        })
        .setOrigin(0.5)
        .setDepth(8);

      this.startLabelBounce(label, baseY, index * 110);

      const hitZone = this.add
        .zone(spot.x, spot.y, spot.radius * 1.85, spot.radius * 1.45)
        .setOrigin(0.5)
        .setDepth(9)
        .setInteractive({ useHandCursor: true });

      hitZone.on("pointerover", () => {
        this.tweens.killTweensOf(label);
        this.tweens.add({
          targets: label,
          y: baseY - 9,
          scale: 1.16,
          duration: 120,
          ease: "Sine.easeOut",
        });
      });

      hitZone.on("pointerout", () => {
        this.tweens.killTweensOf(label);
        this.tweens.add({
          targets: label,
          y: baseY,
          scale: 1,
          duration: 120,
          ease: "Sine.easeOut",
          onComplete: () => this.startLabelBounce(label, baseY, index * 90),
        });
      });

      hitZone.on("pointerdown", () => {
        this.setRoute(hotspotNode[spot.id]);
      });
    });
  }

  private nearestPathNode(x: number, y: number): PathNodeId {
    return (Object.keys(pathNodes) as PathNodeId[]).reduce((nearest, node) => {
      const nearestDistance = Phaser.Math.Distance.Between(x, y, pathNodes[nearest].x, pathNodes[nearest].y);
      const nodeDistance = Phaser.Math.Distance.Between(x, y, pathNodes[node].x, pathNodes[node].y);
      return nodeDistance < nearestDistance ? node : nearest;
    }, "centerPath");
  }

  private shortestPath(start: PathNodeId, end: PathNodeId): PathNodeId[] {
    const queue: PathNodeId[][] = [[start]];
    const visited = new Set<PathNodeId>([start]);

    while (queue.length > 0) {
      const route = queue.shift()!;
      const node = route[route.length - 1];
      if (node === end) return route;

      pathEdges[node].forEach((next) => {
        if (!visited.has(next)) {
          visited.add(next);
          queue.push([...route, next]);
        }
      });
    }

    return [start];
  }
}

export function PixelWorld({ onOpenPanel }: PixelWorldProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const onOpenPanelRef = React.useRef(onOpenPanel);

  React.useEffect(() => {
    onOpenPanelRef.current = onOpenPanel;
  }, [onOpenPanel]);

  React.useEffect(() => {
    if (!containerRef.current) return undefined;

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: containerRef.current,
      width: WORLD.width,
      height: WORLD.height,
      backgroundColor: "rgba(0,0,0,0)",
      transparent: true,
      pixelArt: true,
      scale: {
        mode: Phaser.Scale.NONE,
      },
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
        },
      },
      scene: PortfolioScene,
    });

    game.scene.start("PortfolioScene", {
      onOpenPanel: (id: WorldPanelId) => onOpenPanelRef.current(id),
    });

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div className="pixel-world-wrap">
      <img
        alt="Rachel's Wonderland portfolio map"
        className="map-background"
        draggable={false}
        src="/wonderland-map.png"
      />
      <div className="pixel-world" ref={containerRef} />
    </div>
  );
}
