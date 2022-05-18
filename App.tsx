import 'react-native-gesture-handler'

import { Routes } from './src/routes'
import GeneralStatusBar from './src/screens/components/GlobalComponents/GeneralStatusBar';

export default function App() {
  return (
    <>
    <GeneralStatusBar />
    <Routes />
    </>
  );
}

