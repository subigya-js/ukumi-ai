import { GetServerSideProps } from 'next';
import VideoStyleTranscriptEditor from '../../components/VideoStyleTranscriptEditor';

interface TranscriptEditorProps {
  mediaId: string;
}

const TranscriptEditorPage: React.FC<TranscriptEditorProps> = ({ mediaId }) => {
  return (
    <div>
      <h1>Transcript Editor</h1>
      <VideoStyleTranscriptEditor mediaId={mediaId} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { media_id } = context.query;

  if (!media_id) {
    return {
      notFound: true,
    };
  }

  const mediaId = Array.isArray(media_id) ? media_id[0] : media_id;

  return {
    props: {
      mediaId,
    },
  };
};

export default TranscriptEditorPage;