interface Features {
  [id: string]: boolean;
}

class FeatureService {
  public flags: Features;

  constructor() {
    this.flags = {
      // F001 - Early Access Flow - Users can't sign up on their own
      F001: true,
    };
  }

  // applyOverrides reads feature flags from local storage and overrides
  // the app's default set of enabled features.
  applyOverrides() {
    const flags = localStorage.getItem("flags");
    if (!flags) {
      return;
    }

    const overrides: Features = JSON.parse(flags);
    this.flags = { ...this.flags, ...overrides };
  }
}

export const feature = new FeatureService();
