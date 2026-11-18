export interface SectionHeadingCopy {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
}

export interface UiCopy {
  meta: {
    skipToContent: string;
    navLabel: string;
    menu: string;
    close: string;
    menuTitle: string;
    menuNote: string;
    transitionLabel: string;
  };
  header: {
    wordmark: string;
    descriptor: string;
    counterLabel: string;
  };
  hero: {
    figure: string;
    subject: string;
    dimension: string;
    roleLabel: string;
    availabilityLabel: string;
    scroll: string;
    schematic: {
      title: string;
      coordinate: string;
      scale: string;
      section: string;
    };
  };
  status: {
    localTime: string;
    coordinates: string;
    available: string;
    timezone: string;
  };
  sections: {
    about: SectionHeadingCopy;
    work: SectionHeadingCopy;
    capabilities: SectionHeadingCopy;
    experience: SectionHeadingCopy;
    writing: SectionHeadingCopy;
    contact: SectionHeadingCopy;
  };
  about: {
    specsLabel: string;
    focusLabel: string;
    signature: string;
    plateLabel: string;
    plateNote: string;
  };
  work: {
    columns: {
      index: string;
      project: string;
      outcome: string;
      stack: string;
      year: string;
    };
    previewLabel: string;
    directLinkLabel: string;
    openLabel: string;
  };
  capabilities: {
    columns: {
      code: string;
      item: string;
      application: string;
    };
    countLabel: string;
    note: string;
  };
  experience: {
    currentLabel: string;
    educationLabel: string;
    trainingLabel: string;
    timelineLabel: string;
  };
  writing: {
    readLabel: string;
  };
  contact: {
    eyebrow: string;
    directLine: string;
    copy: string;
    copied: string;
    copyFailed: string;
    socialsLabel: string;
    availabilityNote: string;
    cta: string;
  };
  footer: {
    rights: string;
    backToTop: string;
    profileLabel: string;
    revision: string;
    edition: string;
    localTime: string;
  };
  caseStudy: {
    backToIndex: string;
    caseFile: string;
    visitProject: string;
    livePreview: string;
    previewNote: string;
    metaLabels: {
      client: string;
      year: string;
      role: string;
      stack: string;
      status: string;
    };
    sections: {
      problem: string;
      approach: string;
      architecture: string;
      stack: string;
      outcome: string;
    };
    architectureNote: string;
    nextProject: string;
    endOfFile: string;
  };
  notFound: {
    code: string;
    eyebrow: string;
    title: string;
    description: string;
    action: string;
  };
  cursor: {
    view: string;
    copy: string;
    open: string;
    index: string;
    drag: string;
    visit: string;
  };
  marquee: {
    keywords: string[];
    pause: string;
    play: string;
  };
}
