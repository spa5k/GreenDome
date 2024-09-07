class AudioManager {
  private static instance: HTMLAudioElement | null = null;

  private constructor() {}

  public static getInstance(src: string): HTMLAudioElement {
    if (AudioManager.instance) {
      AudioManager.instance.pause();
      AudioManager.instance.src = src;
      AudioManager.instance.load();
    } else {
      AudioManager.instance = new Audio(src);
      AudioManager.instance.preload = "auto";
      AudioManager.instance.onended = () => {
        AudioManager.instance = null;
      };
      AudioManager.instance.onerror = (error) => {
        console.error(`Failed to load audio: ${error}`);
        AudioManager.instance = null;
      };
    }

    return AudioManager.instance;
  }

  public static stopInstance(): void {
    if (!AudioManager.instance) {
      return;
    }
    AudioManager.instance.pause();
    AudioManager.instance.currentTime = 0;
    AudioManager.instance = null;
  }

  public static play(): void {
    if (!AudioManager.instance) {
      console.error("No audio instance available to play");
      return;
    }
    AudioManager.instance.play().catch((error) => {
      console.error(`Failed to play audio: ${error}`);
    });
  }

  public static pause(): void {
    if (!AudioManager.instance) {
      console.error("No audio instance available to pause");
      return;
    }
    AudioManager.instance.pause();
  }

  public static seek(time: number): void {
    if (!AudioManager.instance) {
      console.error("No audio instance available to seek");
      return;
    }
    AudioManager.instance.currentTime = time;
  }

  public static getCurrentTime(): number {
    if (!AudioManager.instance) {
      console.error("No audio instance available to get current time");
      return 0;
    }
    return AudioManager.instance.currentTime;
  }

  public static getDuration(): number {
    if (!AudioManager.instance) {
      console.error("No audio instance available to get duration");
      return 0;
    }
    return AudioManager.instance.duration;
  }

  public static isPlaying(): boolean {
    if (!AudioManager.instance) {
      console.error("No audio instance available to check if playing");
      return false;
    }
    return !AudioManager.instance.paused;
  }
}

export default AudioManager;
