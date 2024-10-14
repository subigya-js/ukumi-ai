import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Link from 'next/link';
import styles from '../styles/VideoStyleTranscriptEditor.module.css';

interface Text {
  end: number | string;
  formatted_end?: string;
  formatted_start?: string;
  id?: string;
  start: number | string;
  text: string;
}

interface Transcript {
  Version: number;
  Text: Text[];
}

interface JSONSchema {
  media_id: string;
  transcripts: Transcript[];
}

interface Version {
  id: number;
  content: Text[];
  timestamp: string;
}

interface AlertProps {
  message: string;
  type: 'success' | 'error';
}

const CustomAlert: React.FC<AlertProps> = ({ message, type }) => (
  <div className={`${styles.customAlert} ${styles[type]}`}>
    <p>{message}</p>
  </div>
);

const Loader: React.FC = () => (
  <div className={styles.loader}>
    <div className={styles.spinner}></div>
    <p>Loading...</p>
  </div>
);

// Custom hook for debounce
const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    console.log('Debounce: Setting new value', { value, delay });

    return () => {
      clearTimeout(handler);
      console.log('Debounce: Cleared timeout');
    };
  }, [value, delay]);

  return debouncedValue;
};

const VideoStyleTranscriptEditor: React.FC<{ mediaId: string }> = ({ mediaId }) => {
  console.log('VideoStyleTranscriptEditor: Initializing with mediaId', mediaId);

  const [transcript, setTranscript] = useState<Text[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [versions, setVersions] = useState<Version[]>([]);
  const [currentVersionId, setCurrentVersionId] = useState<number | null>(null);
  const [originalHash, setOriginalHash] = useState("");
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [loading, setLoading] = useState(false);
  const transcriptContainerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLInputElement>(null);

  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://api.ukumi.ai' : 'http://localhost:6565';
  console.log('VideoStyleTranscriptEditor: Using baseUrl', baseUrl);

  const timeToSeconds = useCallback((time: string | number): number => {
    if (typeof time === 'number') return time;
    const [hours, minutes, seconds] = time.split(':').map(Number);
    const [secs, millisecs] = seconds.toString().split('.').map(Number);
    const result = hours * 3600 + minutes * 60 + secs + (millisecs || 0) / 1000;
    console.log('timeToSeconds: Converted time', { input: time, output: result });
    return result;
  }, []);

  const totalDuration = useMemo(() => {
    if (transcript.length === 0) return 0;
    const duration = timeToSeconds(transcript[transcript.length - 1].end);
    console.log('totalDuration: Calculated', duration);
    return duration;
  }, [transcript, timeToSeconds]);

  const formatTime = useCallback((seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const millisecs = Math.round((seconds % 1) * 1000);
    const result = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${millisecs.toString().padStart(3, '0')}`;
    console.log('formatTime: Formatted time', { input: seconds, output: result });
    return result;
  }, []);

  const hashTranscript = useCallback((data: Text[]) => {
    const hash = data.reduce((acc, item) => {
      return acc + (item.id || '') + item.start + item.end + item.text;
    }, "");
    console.log('hashTranscript: Generated hash', { dataLength: data.length, hash });
    return hash;
  }, []);

  const hasChanges = useCallback(() => {
    const currentHash = hashTranscript(transcript);
    const result = currentHash !== originalHash;
    console.log('hasChanges: Checked for changes', { result, currentHash, originalHash });
    return result;
  }, [transcript, originalHash, hashTranscript]);

  const fetchTranscriptData = useCallback(async () => {
    console.log('fetchTranscriptData: Starting fetch');
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/v1/transcript/level/sentence/version?media_id=${mediaId}`);
      console.log('fetchTranscriptData: Received response', { status: response.status, ok: response.ok });
      if (!response.ok) {
        setAlert({ message: "Error fetching transcript data!", type: 'error' });
        console.error('fetchTranscriptData: Error response', await response.text());
        return;
      }
      const data: JSONSchema = await response.json();
      console.log('fetchTranscriptData: Parsed data', { transcriptsCount: data.transcripts.length });
      if (data.transcripts.length === 0) {
        setAlert({ message: "No transcripts found for this media!", type: 'error' });
        console.warn('fetchTranscriptData: No transcripts found');
        return;
      }

      // Use the latest version of the transcript
      const latestTranscript = data.transcripts[data.transcripts.length - 1];
      const transcriptWithIds = latestTranscript.Text.map((item, index) => ({
        ...item,
        id: item.id || `generated-${index}`
      }));
      console.log('fetchTranscriptData: Processed latest transcript', { itemCount: transcriptWithIds.length });
      setTranscript(transcriptWithIds);
      const newHash = hashTranscript(transcriptWithIds);
      setOriginalHash(newHash);
      console.log('fetchTranscriptData: Set new hash', newHash);

      // Set up versions
      const mappedVersions: Version[] = data.transcripts.map((t, index) => ({
        id: t.Version,
        content: t.Text.map((item, idx) => ({ ...item, id: item.id || `generated-${idx}` })),
        timestamp: new Date().toISOString() // Assuming we don't have actual timestamps in the API response
      }));
      console.log('fetchTranscriptData: Mapped versions', { count: mappedVersions.length });
      setVersions(mappedVersions);
      setCurrentVersionId(latestTranscript.Version);
      console.log('fetchTranscriptData: Set current version', latestTranscript.Version);

      if (transcriptWithIds.length > 0) {
        const initialTime = timeToSeconds(transcriptWithIds[0].start);
        setCurrentTime(initialTime);
        console.log('fetchTranscriptData: Set initial time', initialTime);
      }

      console.log('fetchTranscriptData: Completed successfully');
    } catch (error) {
      console.error('fetchTranscriptData: Error', error);
      setAlert({ message: "Error fetching transcript data!", type: 'error' });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setAlert(null);
        console.log('fetchTranscriptData: Cleared alert');
      }, 3000);
    }
  }, [mediaId, baseUrl, hashTranscript, timeToSeconds]);

  useEffect(() => {
    console.log('useEffect: Calling fetchTranscriptData');
    fetchTranscriptData();
  }, [fetchTranscriptData]);

  useEffect(() => {
    console.log('useEffect: Handling version change', { currentVersionId });
    if (currentVersionId !== null) {
      const currentVersion = versions.find((v) => v.id === currentVersionId);
      if (currentVersion) {
        console.log('useEffect: Found current version', { id: currentVersion.id, contentLength: currentVersion.content.length });
        setTranscript(currentVersion.content);
        const newHash = hashTranscript(currentVersion.content);
        setOriginalHash(newHash);
        console.log('useEffect: Set new hash for version', newHash);
        if (currentVersion.content.length > 0) {
          const versionInitialTime = timeToSeconds(currentVersion.content[0].start);
          setCurrentTime(versionInitialTime);
          console.log('useEffect: Set initial time for version', versionInitialTime);
        }
      } else {
        console.warn('useEffect: Current version not found', { currentVersionId, versionsCount: versions.length });
      }
    }
  }, [currentVersionId, versions, hashTranscript, timeToSeconds]);

  const handleTextChange = useCallback((id: string, newText: string) => {
    console.log('handleTextChange: Updating text', { id, newText });
    setTranscript((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, text: newText };
        }
        return item;
      })
    );
  }, []);

  const saveVersionToAPI = async (newVersion: Version) => {
    console.log('saveVersionToAPI: Starting', { versionId: newVersion.id, contentLength: newVersion.content.length });
    setLoading(true);
    try {
      const payload = {
        media_id_hex: mediaId,
        content: newVersion.content,
      };
      console.log('saveVersionToAPI: Prepared payload', payload);
      const response = await fetch(`${baseUrl}/v1/transcript/level/sentence/version`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('saveVersionToAPI: Received response', { status: response.status, ok: response.ok });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to save version to API: ${response.status} ${response.statusText}. Error: ${errorText}`);
      }

      const data = await response.json();
      console.log('saveVersionToAPI: Version saved successfully', data);
      setAlert({ message: "Version saved successfully!", type: 'success' });

    } catch (error) {
      console.error('saveVersionToAPI: Error', error);
      setAlert({ message: `Error saving version: ${error}`, type: 'error' });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setAlert(null);
        console.log('saveVersionToAPI: Cleared alert');
      }, 3000);
    }
  };

  const saveVersion = () => {
    console.log('saveVersion: Starting');
    const newVersionId = Math.max(...versions.map(v => v.id), 0) + 1;
    const newVersion: Version = {
      id: newVersionId,
      content: transcript,
      timestamp: new Date().toISOString(),
    };
    console.log('saveVersion: Created new version', { id: newVersionId, contentLength: transcript.length });
    setVersions((prevVersions) => [...prevVersions, newVersion]);
    setCurrentVersionId(newVersionId);
    const newHash = hashTranscript(transcript);
    setOriginalHash(newHash);
    console.log('saveVersion: Set new hash', newHash);
    console.log('saveVersion: Saving to API');
    saveVersionToAPI(newVersion);
  };

  const switchVersion = (versionId: number) => {
    console.log('switchVersion: Switching to version', versionId);
    setCurrentVersionId(versionId);
  };

  const findCurrentTranscriptItem = useCallback((time: number) => {
    const item = transcript.find(
      (item) => timeToSeconds(item.start) <= time && timeToSeconds(item.end) > time
    );
    console.log('findCurrentTranscriptItem: Found item', { time, itemId: item?.id });
    return item;
  }, [transcript, timeToSeconds]);

  const smoothScrollTo = (element: HTMLElement, target: number, duration: number) => {
    console.log('smoothScrollTo: Starting', { target, duration });
    const start = element.scrollTop;
    const change = target - start;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeInOutCubic = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      element.scrollTop = start + change * easeInOutCubic;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        console.log('smoothScrollTo: Completed');
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const updateFocusAndHighlight = useCallback((time: number) => {
    console.log('updateFocusAndHighlight: Starting', { time });
    const currentItem = findCurrentTranscriptItem(time);
    if (currentItem && currentItem.id && transcriptContainerRef.current) {
      const itemElement = document.getElementById(currentItem.id);
      if (itemElement) {
        const containerRect = transcriptContainerRef.current.getBoundingClientRect();
        const itemRect = itemElement.getBoundingClientRect();
        const relativeTop = itemRect.top - containerRect.top;
        const targetScroll = transcriptContainerRef.current.scrollTop + relativeTop - containerRect.height / 2 + itemRect.height / 2;

        console.log('updateFocusAndHighlight: Scrolling to item', { itemId: currentItem.id, targetScroll });
        smoothScrollTo(transcriptContainerRef.current, targetScroll, 300);
      } else {
        console.warn('updateFocusAndHighlight: Item element not found', { itemId: currentItem.id });
      }
    } else {
      console.log('updateFocusAndHighlight: No current item or container ref');
    }
  }, [findCurrentTranscriptItem]);

  const debouncedCurrentTime = useDebounce(currentTime, 100);

  useEffect(() => {
    console.log('useEffect: Updating focus and highlight', { debouncedCurrentTime });
    updateFocusAndHighlight(debouncedCurrentTime);
  }, [debouncedCurrentTime, updateFocusAndHighlight]);

  const handleTimelineChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    console.log('handleTimelineChange: New time', newTime);
    setCurrentTime(newTime);
  }, []);

  const handleTimelineInput = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    const newTime = Number((e.target as HTMLInputElement).value);
    console.log('handleTimelineInput: New time', newTime);
    requestAnimationFrame(() => {
      setCurrentTime(newTime);
    });
  }, []);

  const handleItemClick = (item: Text) => {
    const itemStartTime = timeToSeconds(item.start);
    console.log('handleItemClick: Setting current time', { itemId: item.id, startTime: itemStartTime });
    setCurrentTime(itemStartTime);
  };

  const convertToSRT = useCallback((): string => {
    console.log('convertToSRT: Starting conversion');
    const srtContent = transcript.map((item, index) => {
      const start = item.formatted_start || formatTime(timeToSeconds(item.start));
      const end = item.formatted_end || formatTime(timeToSeconds(item.end));
      return `${index + 1}\n${start} --> ${end}\n${item.text}\n\n`;
    }).join('');
    console.log('convertToSRT: Conversion completed', { contentLength: srtContent.length });
    return srtContent;
  }, [transcript, formatTime, timeToSeconds]);

  const handleDownload = useCallback(() => {
    console.log('handleDownload: Starting download');
    const srtContent = convertToSRT();
    const blob = new Blob([srtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const currentTimestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `transcript_${mediaId}_${currentTimestamp}.srt`;
    link.download = fileName;
    console.log('handleDownload: Created download link', { fileName, contentLength: srtContent.length });
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    console.log('handleDownload: Download initiated');
  }, [convertToSRT, mediaId]);

  if (loading) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }

  if (transcript.length === 0) {
    console.log('VideoStyleTranscriptEditor: No transcript data available');
    return (
      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>
          ← Back to Home
        </Link>
        <h1 className={styles.title}>Video-Style Transcript Editor</h1>
        <p>No transcript data available for this media.</p>
      </div>
    );
  }

  console.log('VideoStyleTranscriptEditor: Rendering with data', {
    transcriptLength: transcript.length,
    currentTime,
    totalDuration,
    versionsCount: versions.length,
    currentVersionId
  });

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← Back to Home
      </Link>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Video-Style Transcript Editor</h1>
        <button
          onClick={handleDownload}
          className={styles.downloadButton}
          title="Download transcript (.srt)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        </button>
      </div>
      {alert && <CustomAlert message={alert.message} type={alert.type} />}

      <div className={styles.timeline}>
        <input
          ref={timelineRef}
          type="range"
          value={currentTime}
          min={0}
          max={totalDuration}
          step={0.001}
          onChange={handleTimelineChange}
          onInput={handleTimelineInput}
          className={styles.timelineInput}
        />
        <div className={styles.timeDisplay}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(totalDuration)}</span>
        </div>
      </div>
      <div ref={transcriptContainerRef} className={styles.transcriptContainer}>
        {transcript.map((item, index) => {
          const itemStartTime = timeToSeconds(item.start);
          const itemEndTime = timeToSeconds(item.end);
          const isHighlighted = currentTime >= itemStartTime && currentTime < itemEndTime;
          return (
            <div
              key={`${item.id || 'item'}-${index}`}
              id={item.id || `item-${index}`}
              onClick={() => handleItemClick(item)}
              className={`${styles.transcriptItem} ${isHighlighted ? styles.highlighted : ''}`}
            >
              <div className={styles.timeRange}>
                <span>{item.formatted_start || formatTime(itemStartTime)}</span>
                <span>{item.formatted_end || formatTime(itemEndTime)}</span>
              </div>
              <textarea
                value={item.text}
                onChange={(e) => handleTextChange(item.id || `item-${index}`, e.target.value)}
                className={styles.transcriptText}
                rows={2}
              />
            </div>
          );
        })}
      </div>
      <div className={styles.buttonContainer}>
        <button
          onClick={saveVersion}
          disabled={!hasChanges() || loading}
          className={`${styles.saveButton} ${(!hasChanges() || loading) ? styles.disabled : ''}`}
        >
          {loading ? 'Saving...' : 'Save Version'}
        </button>
      </div>
      <div className={styles.versionsContainer}>
        <h2 className={styles.versionsTitle}>Versions</h2>
        <div className={styles.versionsList}>
          {versions.map((version) => (
            <div
              key={version.id}
              className={`${styles.versionItem} ${currentVersionId === version.id ? styles.currentVersion : ''}`}
              onClick={() => switchVersion(version.id)}
            >
              <p className={styles.versionId}>Version {version.id}</p>
              <p className={styles.versionTimestamp}>{version.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoStyleTranscriptEditor;