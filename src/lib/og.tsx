import { ImageResponse } from "next/og";
import type { CSSProperties } from "react";
import { profile } from "@/data/profile";
import type { Project } from "@/types";
import { OG_CONTENT_TYPE, OG_SIZE } from "./constants";

export { OG_CONTENT_TYPE, OG_SIZE };

export const OG_ALT = `${profile.displayName} — ${profile.role}`;

const label: CSSProperties = {
  display: "flex",
  alignItems: "center",
  fontSize: 15,
  letterSpacing: 3.4,
  color: "#7A7A80",
  textTransform: "uppercase",
};

const frame: CSSProperties = {
  position: "absolute",
  top: 24,
  left: 24,
  right: 24,
  bottom: 24,
  border: "1px solid #26262B",
};

const page: CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  background: "#0A0A0B",
  color: "#E8E6E1",
  padding: "52px 64px",
  position: "relative",
};

const kMarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="230 190 560 560"><rect width="1000" height="1000" fill="#0A0A0B"/><g fill="#E8E6E1"><path d="M302 300H402V700H302Z"/><path d="M418 470L588 300H698L418 580Z"/><path d="M455 567L588 700H698L510 512Z"/></g><rect x="698" y="240" width="60" height="60" fill="#FF4D1A"/></svg>`;

const kMarkSrc = `data:image/svg+xml,${encodeURIComponent(kMarkSvg)}`;

const headerRow: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  ...label,
};

const footerRow: CSSProperties = {
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
  borderTop: "1px solid #26262B",
  paddingTop: 20,
  ...label,
};

function header(kicker: string) {
  return (
    <div style={headerRow}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders inline SVG through img */}
        <img
          src={kMarkSrc}
          width={32}
          height={32}
          alt=""
          style={{ marginRight: 14 }}
        />
        <div style={{ display: "flex" }}>Konain Nasir / Engineering Dossier</div>
      </div>
      <div style={{ display: "flex" }}>{kicker}</div>
    </div>
  );
}

function footer(left: string, right: string) {
  return (
    <div style={footerRow}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: 8,
            height: 8,
            border: "1px solid #FF4D1A",
            marginRight: 12,
          }}
        />
        <div style={{ display: "flex" }}>{left}</div>
      </div>
      <div style={{ display: "flex" }}>{right}</div>
    </div>
  );
}

function ProfileImage() {
  return (
    <div style={page}>
      <div style={frame} />
      {header("KHI 24.8607 N")}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 19,
            letterSpacing: 5,
            color: "#FF4D1A",
            textTransform: "uppercase",
          }}
        >
          {profile.role}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 172,
              lineHeight: 0.8,
              letterSpacing: -7,
              textTransform: "uppercase",
            }}
          >
            {profile.firstName}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 172,
              lineHeight: 0.8,
              letterSpacing: -7,
              textTransform: "uppercase",
              color: "#7A7A80",
            }}
          >
            {profile.lastName}
          </div>
        </div>
      </div>

      {footer(
        profile.availability.label,
        `${profile.revision} / ${profile.edition}`,
      )}
    </div>
  );
}

function ProjectImage({ project }: { project: Project }) {
  const nameSize =
    project.name.length <= 12 ? 150 : project.name.length <= 18 ? 118 : 98;

  return (
    <div style={page}>
      <div style={frame} />
      {header(`Case file / ${project.index}`)}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 8,
          marginBottom: 8,
          paddingTop: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 18,
            letterSpacing: 4,
            color: "#FF4D1A",
            textTransform: "uppercase",
          }}
        >
          {project.category} / {project.year}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: nameSize,
            lineHeight: 0.86,
            letterSpacing: -5,
            textTransform: "uppercase",
            maxWidth: 1000,
          }}
        >
          {project.name}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 24,
            maxWidth: 880,
            fontSize: 25,
            lineHeight: 1.35,
            color: "#7A7A80",
          }}
        >
          {project.summary}
        </div>
      </div>

      {footer(
        project.status,
        project.stack.slice(0, 4).join(" / ").toUpperCase(),
      )}
    </div>
  );
}

export function createOgImage(project?: Project): ImageResponse {
  return new ImageResponse(
    project ? <ProjectImage project={project} /> : <ProfileImage />,
    OG_SIZE,
  );
}
