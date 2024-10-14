import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Link from 'next/link';
import styles from '../styles/ChapterizedTranscriptEditor.module.css';

interface Chapter {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  expanded: boolean;
}

interface Transcript {
  id: string;
  start: string;
  end: string;
  text: string;
}

interface Version {
  id: number;
  content: Transcript[];
  timestamp: string;
}

interface GlossaryItem {
  word: string;
  frequency: number;
  category: string;
  suggestion: string;
}

interface ChapterizedTranscriptEditorProps {
  mediaId: string;
}

const ChapterizedTranscriptEditor: React.FC<ChapterizedTranscriptEditorProps> = ({ mediaId }) => {
  const [activeTab, setActiveTab] = useState<'transcript' | 'glossary' | 'context'>('transcript');
  const [chapters, setChapters] = useState<Chapter[]>([
    { id: "1", title: "Introduction", startTime: "00:00:00.000", endTime: "00:00:30.234", expanded: false },
    { id: "2", title: "Main Topic 1", startTime: "00:00:30.235", endTime: "00:01:45.678", expanded: false },
    { id: "3", title: "Main Topic 2", startTime: "00:01:45.679", endTime: "00:02:30.123", expanded: false },
    { id: "4", title: "Discussion", startTime: "00:02:30.124", endTime: "00:03:15.456", expanded: false },
    { id: "5", title: "Conclusion", startTime: "00:03:15.457", endTime: "00:03:67.234", expanded: false },
  ]);
  const [transcript, setTranscript] = useState<Transcript[]>([
    { id: "1", start: "00:00:00.000", end: "00:00:15.000", text: "Welcome to our video on chapterized transcripts." },
    { id: "2", start: "00:00:15.001", end: "00:00:30.234", text: "Today, we'll explore how to implement this feature." },
    { id: "3", start: "00:00:30.235", end: "00:01:00.000", text: "Let's start with our first main topic: data structures." },
    // ... more transcript items
  ]);
  const [versions, setVersions] = useState<Version[]>([
    { id: 0, content: [], timestamp: "2024-10-01T09:08:59.433Z" },
    { id: 1, content: [], timestamp: "2024-10-01T10:15:30.123Z" },
    { id: 2, content: [], timestamp: "2024-10-01T11:45:12.789Z" },
    { id: 3, content: [], timestamp: "2024-10-01T13:20:45.456Z" },
  ]);
  const [currentVersionId, setCurrentVersionId] = useState<number>(3);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(227.234); // 00:03:67.234 in seconds
  const [editingChapterId, setEditingChapterId] = useState<string | null>(null);
  const [originalHash, setOriginalHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState("");
  const transcriptContainerRef = useRef<HTMLDivElement>(null);
  const [isVersionsCollapsed, setIsVersionsCollapsed] = useState(false);
  const [glossaryItems, setGlossaryItems] = useState<GlossaryItem[]>([
    { word: "Okumi", frequency: 2, category: "Company", suggestion: "Ukumi" },
    { word: "Sachin", frequency: 3, category: "Person", suggestion: "Rachin" },
  ]);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(parseFloat(e.target.value));
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) * 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  };

  const toggleChapterExpansion = (chapterId: string) => {
    setChapters(prevChapters =>
      prevChapters.map(chapter =>
        chapter.id === chapterId ? { ...chapter, expanded: !chapter.expanded } : chapter
      )
    );
  };

  const getChapterTranscript = (startTime: string, endTime: string) => {
    return transcript.filter(item =>
      item.start >= startTime && item.end <= endTime
    );
  };

  const handleChapterTitleEdit = (chapterId: string) => {
    setEditingChapterId(chapterId);
  };

  const handleChapterTitleSave = (chapterId: string, newTitle: string) => {
    setChapters(prevChapters =>
      prevChapters.map(chapter =>
        chapter.id === chapterId ? { ...chapter, title: newTitle } : chapter
      )
    );
    setEditingChapterId(null);
  };

  const handleTextChange = useCallback((id: string, newText: string) => {
    setTranscript((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, text: newText };
        }
        return item;
      })
    );
  }, []);

  const hashTranscript = useCallback((data: Transcript[]) => {
    return data.reduce((acc, item) => {
      return acc + item.id + item.start + item.end + item.text;
    }, "");
  }, []);

  const hasChanges = useCallback(() => {
    const currentHash = hashTranscript(transcript);
    return currentHash !== originalHash;
  }, [transcript, originalHash, hashTranscript]);

  const saveVersion = useCallback(() => {
    const newVersionId = Math.max(...versions.map(v => v.id), 0) + 1;
    const newVersion: Version = {
      id: newVersionId,
      content: transcript,
      timestamp: new Date().toISOString(),
    };
    setVersions((prevVersions) => [...prevVersions, newVersion]);
    setCurrentVersionId(newVersionId);
    const newHash = hashTranscript(transcript);
    setOriginalHash(newHash);
    // Here you would typically save to an API
    console.log('Saving new version:', newVersion);
  }, [versions, transcript, hashTranscript]);

  const switchVersion = useCallback((versionId: number) => {
    setCurrentVersionId(versionId);
    const version = versions.find(v => v.id === versionId);
    if (version) {
      setTranscript(version.content);
      const newHash = hashTranscript(version.content);
      setOriginalHash(newHash);
    }
  }, [versions, hashTranscript]);

  const handleDownload = useCallback(() => {
    const srtContent = transcript.map((item, index) => {
      return `${index + 1}\n${item.start} --> ${item.end}\n${item.text}\n\n`;
    }).join('');
    const blob = new Blob([srtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const currentTimestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `transcript_${mediaId}_${currentTimestamp}.srt`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [transcript, mediaId]);

  const handleContextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContext(e.target.value);
  };

  const handleContextSend = () => {
    // Here you would typically send the context to an API
    console.log('Sending context:', context);
    // Clear the context input after sending
    setContext('');
  };

  const toggleVersions = () => {
    setIsVersionsCollapsed(!isVersionsCollapsed);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}, ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  };

  const renderGlossaryContent = () => (
    <div className={styles.glossaryContent}>
      <table className={styles.glossaryTable}>
        <thead>
          <tr>
            <th>Words</th>
            <th>Frequency</th>
            <th>Category</th>
            <th>Suggestion</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {glossaryItems.map((item, index) => (
            <tr key={index}>
              <td>{item.word}</td>
              <td>{item.frequency}</td>
              <td>{item.category}</td>
              <td>{item.suggestion}</td>
              <td>
                <button className={styles.checkButton}>✓</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderContextContent = () => (
    <div className={styles.contextContent}>
      <textarea
        value={context}
        onChange={handleContextChange}
        placeholder="Enter context of the video here..."
        rows={5}
        className={styles.contextTextarea}
      />
      <button onClick={handleContextSend} className={styles.sendButton}>
        Send
      </button>
    </div>
  );

  return (
    <div className={styles.editorContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>Logo</div>
        <h1 className={styles.title}>Transcript Editor V2</h1>
        <div className={styles.userIcon}>👤</div>
      </header>

      <div className={styles.videoProgress}>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleProgressChange}
          className={styles.progressBar}
        />
        <div className={styles.timeDisplay}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.leftPanel}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'transcript' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('transcript')}
            >
              <span className={styles.tabIcon}>📝</span> Transcript
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'glossary' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('glossary')}
            >
              <span className={styles.tabIcon}>📚</span> Glossary
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'context' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('context')}
            >
              <span className={styles.tabIcon}>🔍</span> Context
            </button>
          </div>

          {activeTab === 'transcript' && (
            <div ref={transcriptContainerRef} className={styles.chapterList}>
              {chapters.map((chapter) => (
                <div key={chapter.id} className={styles.chapterItem} aria-expanded={chapter.expanded}>
                  <div className={styles.chapterHeader} onClick={() => toggleChapterExpansion(chapter.id)}>
                    <span className={styles.chapterIcon}>{chapter.expanded ? '▼' : '▶'}</span>
                    {editingChapterId === chapter.id ? (
                      <input
                        type="text"
                        value={chapter.title}
                        onChange={(e) => handleChapterTitleSave(chapter.id, e.target.value)}
                        onBlur={() => setEditingChapterId(null)}
                        autoFocus
                        className={styles.chapterTitleInput}
                      />
                    ) : (
                      <span className={styles.chapterTitle}>{chapter.title}</span>
                    )}
                    <span className={styles.chapterTime}>{`${chapter.startTime} - ${chapter.endTime}`}</span>
                  </div>
                  <div className={styles.chapterTranscript}>
                    {getChapterTranscript(chapter.startTime, chapter.endTime).map((item) => (
                      <div key={item.id} className={styles.transcriptItem}>
                        <div className={styles.transcriptTime}>
                          <span>{item.start}</span>
                          <span>{item.end}</span>
                        </div>
                        <textarea
                          value={item.text}
                          onChange={(e) => handleTextChange(item.id, e.target.value)}
                          className={styles.transcriptText}
                          rows={2}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'glossary' && renderGlossaryContent()}
          {activeTab === 'context' && renderContextContent()}
        </div>

        <div className={`${styles.rightPanel} ${isVersionsCollapsed ? styles.collapsed : ''}`}>
          <div className={styles.versionsContainer}>
            <button onClick={toggleVersions} className={styles.collapseButton}>
              {isVersionsCollapsed ? '◀' : '▶'}
            </button>
            {!isVersionsCollapsed && (
              <>
                <div className={styles.mediaIdSection}>
                  <p className={styles.mediaId}>Media ID: {mediaId}</p>
                </div>

                <div className={styles.versionsSection}>
                  <h2 className={styles.versionsTitle}>Versions</h2>
                  <div className={styles.versionsList}>
                    {versions.map((version) => (
                      <div
                        key={version.id}
                        className={`${styles.versionItem} ${currentVersionId === version.id ? styles.currentVersion : ''}`}
                        onClick={() => switchVersion(version.id)}
                      >
                        <span className={styles.versionId}>Version {version.id}</span>
                        <span className={styles.versionTimestamp}>{formatDate(version.timestamp)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.buttonContainer}>
                  <button
                    onClick={saveVersion}
                    disabled={!hasChanges() || loading}
                    className={`${styles.saveButton} ${(!hasChanges() || loading) ? styles.disabled : ''}`}
                  >
                    {loading ? 'Saving...' : 'Save Version'}
                  </button>
                  <button
                    onClick={handleDownload}
                    className={styles.downloadButton}
                  >
                    Download Transcript
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterizedTranscriptEditor;
