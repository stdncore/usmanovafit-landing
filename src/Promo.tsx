import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";

const PINK = "#E8527A";

const fadeUp = (frame: number, fps: number, delay: number) => {
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return {
    opacity: interpolate(s, [0, 1], [0, 1]),
    transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px)`,
  };
};

export const Promo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // pulsing accent glow
  const glow = 0.35 + 0.15 * Math.sin((frame / fps) * 2.2);
  // CTA pulse
  const ctaScale = 1 + 0.03 * Math.sin((frame / fps) * 4);
  // subtle outro fade
  const outro = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: "#0D0D0D",
        fontFamily: "Montserrat, Helvetica, Arial, sans-serif",
        opacity: outro,
      }}
    >
      {/* radial accent */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 30%, rgba(232,82,122,${glow}) 0%, rgba(13,13,13,0) 55%)`,
        }}
      />
      {/* bottom vignette */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, rgba(13,13,13,0) 50%, rgba(13,13,13,0.9) 100%)",
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 90px",
          textAlign: "center",
        }}
      >
        <Sequence from={0}>
          <div
            style={{
              ...fadeUp(frame, fps, 0),
              display: "inline-block",
              padding: "14px 32px",
              borderRadius: 100,
              border: `2px solid rgba(232,82,122,0.4)`,
              background: "rgba(232,82,122,0.12)",
              color: "#F07098",
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 48,
            }}
          >
            580 000+ учениц
          </div>
        </Sequence>

        <Sequence from={8}>
          <h1
            style={{
              ...fadeUp(frame, fps, 8),
              color: "#F5F5F5",
              fontSize: 92,
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: -2,
              margin: 0,
            }}
          >
            Приведите тело
            <br />в форму с{" "}
            <span style={{ color: PINK }}>чемпионкой</span>
          </h1>
        </Sequence>

        <Sequence from={20}>
          <p
            style={{
              ...fadeUp(frame, fps, 20),
              color: "rgba(245,245,245,0.7)",
              fontSize: 40,
              fontWeight: 500,
              lineHeight: 1.45,
              maxWidth: 760,
              marginTop: 40,
            }}
          >
            Без диет, голода и запретов — с пользой для здоровья
          </p>
        </Sequence>

        <Sequence from={34}>
          <div
            style={{
              ...fadeUp(frame, fps, 34),
              marginTop: 60,
              transform: `${fadeUp(frame, fps, 34).transform} scale(${ctaScale})`,
              background: PINK,
              color: "#fff",
              fontSize: 42,
              fontWeight: 700,
              padding: "30px 72px",
              borderRadius: 100,
              boxShadow: "0 20px 60px rgba(232,82,122,0.4)",
            }}
          >
            Выбрать программу
          </div>
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
