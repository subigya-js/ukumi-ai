import { GetServerSideProps } from 'next';
import ChapterizedTranscriptEditor from '../../components/ChapterizedTranscriptEditor';

interface TranscriptEditorProps {
  mediaId: string;
}

const TranscriptEditorPage: React.FC<TranscriptEditorProps> = ({ mediaId }) => {
  return <ChapterizedTranscriptEditor mediaId={mediaId} />;
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