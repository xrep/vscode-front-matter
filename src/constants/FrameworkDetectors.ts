export const FrameworkDetectors = [
  {
    "framework": {"name": "gatsby", "dist": "public", "static": "static", "build": "gatsby build"},
    "requiredFiles": ["gatsby-config.js"],
    "requiredDependencies": ["gatsby"],
    "commands": {
      "start": "npx gatsby develop"
    }
  },
  {
    "framework": {"name": "hugo", "dist": "public", "static": "static", "build": "hugo"},
    "requiredFiles": ["config.toml", "config.yaml", "config.yml"],
    "commands": {
      "start": "hugo server -D"
    }
  },
  {
    "framework": {"name": "next", "dist": ".next", "static": "public", "build": "next build"},
    "requiredFiles": ["next.config.js"],
    "requiredDependencies": ["next"],
    "commands": {
      "start": "npx next dev"
    }
  },
  {
    "framework": {"name": "nuxt", "dist": "dist", "static": "static", "build": "nuxt"},
    "requiredFiles": ["nuxt.config.js"],
    "requiredDependencies": ["nuxt"],
    "commands": {
      "start": "npx nuxt"
    }
  }
];