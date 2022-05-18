import 'react-native-gesture-handler'

import { Routes } from './src/routes'
import GeneralStatusBar from './src/screens/components/GlobalComponents/GeneralStatusBar';
import { createServer } from "miragejs"

createServer({
  routes() {
    this.get("/api/movies", () => {
      return {
        movies: [
          { id: 1, name: "Inception", year: 2010 },
          { id: 2, name: "Interstellar", year: 2014 },
          { id: 3, name: "Dunkirk", year: 2017 },
        ],
      }
    })
  },
})

export default function App() {
  return (
    <>
    <GeneralStatusBar />
    <Routes />
    </>
  );
}

