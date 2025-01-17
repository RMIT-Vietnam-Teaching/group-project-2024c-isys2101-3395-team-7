import dynamic from 'next/dynamic';

const VoiceRecorder = dynamic(() => import('./VoiceRecorderComponent'), { ssr: false });

export default VoiceRecorder;