import { profile } from "@/data/profile";
import { ui } from "@/data/ui";
import { KMark } from "./KMark";

export function SubjectPlate() {
  return (
    <figure className="relative">
      <KMark
        variant="full"
        animated
        title="Konain K mark"
        className="aspect-square w-full border border-line"
      />

      <figcaption className="mt-3 flex items-start justify-between gap-4 border-t border-line pt-3">
        <div>
          <p className="mono-label text-muted">
            {ui.about.plateLabel} / K
          </p>
          <p className="mono-label mt-1 text-muted/70">{ui.about.plateNote}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="mono-label text-muted">{profile.revision}</p>
          <p className="mono-label mt-1 text-muted/70">
            {profile.location.city.toUpperCase()} / PK
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
