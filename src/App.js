import { useState } from "react";
import SilhouetteImage from "./silhouette";
import { useEffect } from "react";

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

  // １スタートボタン押下
  // ２ロード画面
  // ３ロード中にデータのフェッチ、
  // ４画像データのシルエット変換
  // ５変換完了後にレンダリング

  // １スタートボタン押下
  const QuizStrat = () => {
    setStart(false);
    // ２ロード画面
    setLoding(true);

    const randomNum = Math.floor(Math.random() * (max + 1 - min)) + min;

    const pokemonDataJp =
      "https://pokeapi.co/api/v2/pokemon-species/" + randomNum;
    const pokemonData = "https://pokeapi.co/api/v2/pokemon/" + randomNum;

    // ３ロード中にデータのフェッチ、
    // APIを叩いてポケモンのJSONデータを取得する。
    // API1
    async function fetchData1() {
      const data = await fetch(pokemonDataJp);
      const res = await data.json();
      const jaName = res.names.find((name) => name.language.name === "ja").name;
      setPokemonName(jaName);
      setPokemonDetailsJp(res);
    }

    // API2
    async function fetchData2() {
      const data = await fetch(pokemonData);
      const res = await data.json();
      setPokemonDetails(res);
    }
    fetchData1();
    fetchData2();
  };

  const Answer = () => {
    if (answerWord === pokemonName) {
      setCheckingAnswers(true);
      return;
    }
    setCheckingAnswers(false);
  };

  useEffect(() => {
    if (!pokemonDetails) return;
    setLoding(false);
  }, [pokemonDetails]); // 第2引数には副作用関数の実行タイミングを制御する依存データを記述

  const retry = () => {
    window.location.reload();
  };

  return (
    <>
      {/* 外枠 */}
      <div className="flex flex-col text-center mt-28 font-DotGothic16">
        <div hidden={checkingAnswers === "" ? false : true}>
          <div className="mx-auto my-auto">
            <div
              hidden={pokemonDetails ? true : false}
              className="font-extrabold text-6xl mt-40 mb-8"
              id="title"
            >
              ポケモンクイズ
            </div>

            <button
              onClick={QuizStrat}
              hidden={start ? false : true}
              className="bg-red-500 hover:bg-red-400 text-white rounded px-4 py-2 outline-double outline-black"
            >
              クイズを始める
            </button>
            <div hidden={loading ? false : true}>ロード中.....</div>
          </div>
          <div className="flex">
            <div className="mx-auto" hidden={pokemonDetails ? false : true}>
              <div className="flex text-center">
                <SilhouetteImage
                  idden={pokemonDetails ? false : true}
                  width={300}
                  height={300}
                  imageURL={
                    pokemonDetails
                      ? pokemonDetails.sprites.other["official-artwork"]
                          .front_default
                      : ""
                  }
                />
              </div>
              <input
                onChange={(event) => setAnswerWord(event.target.value)}
                onBlur={(event) => setAnswerWord(event.target.value)}
                hidden={pokemonDetails ? false : true}
                className="shadow appearance-none border rounded w-full mt-6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline outline-double outline-black "
              />
            </div>
          </div>
          <div>
            <button
              onClick={Answer}
              hidden={pokemonDetails ? false : true}
              className="bg-red-500 hover:bg-red-400 text-white rounded px-4 py-2 outline-double outline-black mt-6"
            >
              答える
            </button>
          </div>
        </div>
        <div hidden={checkingAnswers === "" ? true : false}>
          <div>
            <img
              className="mx-auto"
              width={300}
              height={300}
              src={
                pokemonDetails
                  ? pokemonDetails.sprites.other["official-artwork"]
                      .front_default
                  : ""
              }
            />
            <div className="text-2xl">
              {checkingAnswers ? "正解" : "ハズレ"}
            </div>
            <div className="text-2xl mb-8">{pokemonName}です</div>
            <button
              onClick={retry}
              className="bg-red-500 hover:bg-red-400 text-white rounded px-4 py-2 outline-double outline-black mt-6q"
            >
              リトライ
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
