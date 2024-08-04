import { execSync } from 'child_process';
import { MediaFileService } from './index';
import { resolve } from "node:path";

export type Platform = 'aix' | 'android' | 'darwin' | 'freebsd' | 'haiku' | 'linux' | 'openbsd' | 'sunos' | 'win32' | 'cygwin' | 'netbsd';

export class FfmpegMediaFileService implements MediaFileService {
  private platform: Platform;

  constructor(params: { platform: Platform }) {
    this.platform = params.platform;
  }

  checkInstall(): void {
    if (this.platform !== 'win32') {
      throw new Error('Not implemented on non windows platforms');
    }

    try {
      // Call ffmpeg to check install
      const path = execSync('where ffmpeg', { 
        encoding: "utf-8"
      });

      console.debug(path);

      // Default error message returned by ffmpeg. 
      // Indicates it has been installed and added to PATH
      if (path.includes('Could not find file')) {
        process.env.PATH = resolve(__dirname, 'bin;') + process.env.PATH;
      }

      console.log("ffmpeg installation verified.")
    } catch (error) {
      console.error("Couldn't find ffmpeg. Please install");
    }
  }
}
