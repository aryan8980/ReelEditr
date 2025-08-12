import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Zap } from "lucide-react";

interface BeatTimelineProps {
  audioFile: File;
  beatPoints: number[];
  onBeatPointsChange: (beats: number[]) => void;
  isPlaying: boolean;
  onPlayToggle: (playing: boolean) => void;
}

const BeatTimeline = ({ 
  audioFile, 
  beatPoints, 
  onBeatPointsChange, 
  isPlaying, 
  onPlayToggle 
}: BeatTimelineProps) => {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (audioFile && audioRef.current) {
      const url = URL.createObjectURL(audioFile);
      audioRef.current.src = url;
      
      return () => URL.revokeObjectURL(url);
    }
  }, [audioFile]);

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      onPlayToggle(!isPlaying);
    }
  };

  const handleTimelineClick = (e: React.MouseEvent) => {
    if (timelineRef.current && audioRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const newTime = percentage * duration;
      
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const addBeatPoint = () => {
    const newBeat = currentTime;
    const newBeats = [...beatPoints, newBeat].sort((a, b) => a - b);
    onBeatPointsChange(newBeats);
  };

  const removeBeatPoint = (beatTime: number) => {
    const newBeats = beatPoints.filter(beat => Math.abs(beat - beatTime) > 0.1);
    onBeatPointsChange(newBeats);
  };

  const clearBeatPoints = () => {
    onBeatPointsChange([]);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      <audio
        ref={audioRef}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => onPlayToggle(false)}
      />

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            onClick={togglePlay}
            disabled={!duration}
            className="btn-creative bg-primary hover:shadow-glow"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>
          
          <div className="text-sm text-muted-foreground">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={addBeatPoint}
            disabled={!duration}
            className="btn-creative bg-accent hover:shadow-glow"
          >
            <Zap className="w-4 h-4 mr-2" />
            Mark Beat
          </Button>
          
          <Button
            onClick={clearBeatPoints}
            disabled={beatPoints.length === 0}
            variant="outline"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      {/* Timeline */}
      <div className="timeline-container">
        <div
          ref={timelineRef}
          className="relative h-16 bg-muted/30 rounded-lg cursor-pointer overflow-hidden"
          onClick={handleTimelineClick}
        >
          {/* Waveform placeholder */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 opacity-50" />
          
          {/* Progress */}
          <div
            className="absolute top-0 left-0 h-full bg-gradient-primary opacity-30 transition-all duration-100"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />

          {/* Current time indicator */}
          <div
            className="absolute top-0 w-0.5 h-full bg-white shadow-lg transition-all duration-100"
            style={{ left: `${(currentTime / duration) * 100}%` }}
          />

          {/* Beat markers */}
          {beatPoints.map((beat, index) => (
            <div
              key={index}
              className="beat-marker animate-beat-mark hover:bg-accent"
              style={{ left: `${(beat / duration) * 100}%` }}
              onClick={(e) => {
                e.stopPropagation();
                removeBeatPoint(beat);
              }}
              title={`Beat at ${formatTime(beat)} - Click to remove`}
            />
          ))}
        </div>
      </div>

      {/* Beat Points Summary */}
      {beatPoints.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {beatPoints.map((beat, index) => (
            <div
              key={index}
              className="px-2 py-1 bg-accent/20 text-accent rounded text-xs font-mono cursor-pointer hover:bg-accent/30 transition-colors"
              onClick={() => removeBeatPoint(beat)}
              title="Click to remove"
            >
              {formatTime(beat)}
            </div>
          ))}
        </div>
      )}

      {/* Instructions */}
      <div className="text-xs text-muted-foreground text-center p-3 bg-muted/20 rounded-lg">
        <p>🎵 Play the audio and tap "Mark Beat" to set beat points</p>
        <p>Click on the timeline to scrub through the audio</p>
        <p>Click on beat markers or time stamps to remove them</p>
      </div>
    </div>
  );
};

export default BeatTimeline;