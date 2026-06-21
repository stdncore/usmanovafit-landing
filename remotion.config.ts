import { Config } from "@remotion/cli/config";

// png frames avoid full-range (yuvj420p) output that some players glitch on
Config.setVideoImageFormat("png");
Config.setOverwriteOutput(true);
Config.setCodec("h264");
Config.setColorSpace("bt709");
