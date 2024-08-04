import { FfmpegMediaFileService } from './services/media/ffmpeg.js';
import { format } from 'util';

(() => {
  try {
    const mediaFileService = new FfmpegMediaFileService({
      platform: process.platform,
    });
    mediaFileService.checkInstall();
  } catch (error) {
    console.log(format(error));
  }
})();
