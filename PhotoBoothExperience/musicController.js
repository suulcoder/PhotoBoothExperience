import TrackPlayer, {
    AppKilledPlaybackBehavior,
    Capability,
    RepeatMode,
} from 'react-native-track-player';
  
export async function setupPlayer() {
  let isSetup = false;
  try {
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  }
  catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
      ],
      progressUpdateEventInterval: 2,
    });
    isSetup = true;
  }
  finally {
    return isSetup;
  }
}

export async function addTrack() {
  await TrackPlayer.add([
    {
        url: require('./public/LMDA.wav'), // Load media from the app bundle
        title: 'LMDA',
        artist: 'Zack Steam',
        artwork: require('./public/Artwork.png'), // Load artwork from the app bundle
        duration: 200
    }
  ]);
  await TrackPlayer.setRepeatMode(RepeatMode.Track);
}