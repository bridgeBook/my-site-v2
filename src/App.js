import { useRef, useState } from "react";
import SilhouetteImage from "./silhouette";
import { useEffect } from "react";
import { getValue } from "@testing-library/user-event/dist/utils";

// pokeAPIを使ってポケモンを当てるクイズアプリを作りたい
// １　pokeAPIからデータを取得する。✅
// ２　取得したデータからランダムに一つのポケモンを指定する ✅

function App() {
  // ポケAPI1
  const [pokemonDetailsJp, setPokemonDetailsJp] = useState(undefined);
  // ポケAPI2
  const [pokemonDetails, setPokemonDetails] = useState(undefined);
  const [pokemonName, setPokemonName] = useState("");
  const [loading, setLoding] = useState(false);
  const [start, setStart] = useState(true);
  //   答え
  const [answerWord, setAnswerWord] = useState("");
  const [checkingAnswers, setCheckingAnswers] = useState("");

  let min = 1;
  let max = 1000;

  const QuizStrat = () => {
    setLoding(true);

    const randomNum = Math.floor(Math.random() * (max + 1 - min)) + min;

    const pokemonDataJp =
      "https://pokeapi.co/api/v2/pokemon-species/" + randomNum;
    const pokemonData = "https://pokeapi.co/api/v2/pokemon/" + randomNum;

    // APIを叩いてポケモンのJSONデータを取得する。
    async function fetchData1() {
      const data = await fetch(pokemonDataJp);
      const res = await data.json();
      const jaName = res.names.find((name) => name.language.name === "ja").name;
      setPokemonName(jaName);
      setPokemonDetailsJp(res);
    }
    async function fetchData2() {
      const data = await fetch(pokemonData);
      const res = await data.json();
      setPokemonDetails(res);
      setLoding(false);
    }
    fetchData1();
    fetchData2();
  };

  const Start = () => {
    if (loading) {
      setStart(false);
      return <div>ロード中.....</div>;
    }
  };

  const StartButton = () => {
    if (!start) return;
    return (
      <button
        onClick={QuizStrat}
        className="StartButton bg-red-500 hover:bg-red-400 text-white rounded px-4 py-2"
      >
        クイズを始める
      </button>
    );
  };

  const Siruetto = () => {
    if (!pokemonDetails) return;
    return (
      <>
        <div className="flex text-center">
          <SilhouetteImage
            width={300}
            height={300}
            imageURL={
              pokemonDetails.sprites.other["official-artwork"].front_default
            }
          />
        </div>
      </>
    );
  };

  const Answer = () => {
    if (answerWord === pokemonName) {
      setCheckingAnswers(true);
      return;
    }
    setCheckingAnswers(false);
  };

  return (
    <>
      {/* 外枠 */}
      <div className="flex flex-col text-center mt-28">
        <div hidden={checkingAnswers === "" ? false : true}>
          <div className="mx-auto my-auto">
            <div
              hidden={pokemonDetails ? true : false}
              className="font-bold text-2xl mt-40 mb-5"
            >
              ポケモンクイズ
            </div>
            <Start />
            <StartButton />
          </div>
          <div className="flex">
            <div className="mx-auto">
              <Siruetto />
              <input
                onChange={(event) => setAnswerWord(event.target.value)}
                onBlur={(event) => setAnswerWord(event.target.value)}
                hidden={pokemonDetails ? false : true}
                className="shadow appearance-none border rounded w-full mt-6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div>
            <button
              onClick={Answer}
              hidden={pokemonDetails ? false : true}
              className="bg-blue-500 hover:bg-blue-400 text-white rounded px-4 py-2 mt-6"
            >
              答える
            </button>
          </div>
        </div>
        <div hidden={checkingAnswers === "" ? true : false}>
          <div>{checkingAnswers ? "正解" : "ハズレ"}</div>
          <div>{pokemonName}です</div>
        </div>
      </div>
    </>
  );
}

export default App;
