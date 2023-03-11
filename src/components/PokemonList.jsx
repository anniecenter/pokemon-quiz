import { createRef, useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { colors } from "../constants/colors";
import pokemonList from "../data/pokemonList";
import DexNumRangeSelector from "./DexNumRangeSelector";

export default function PokemonList() {
    const styles = useStyles({ colors });

    const inputRefs = Array.from({ length: pokemonList.length }, () => createRef());
    const [pokemonInputProps, setPokemonInputProps] = useState(pokemonList.map((pkmn, index) => {
        return {
            value: "",
            answer: pkmn,
            dexNum: index + 1,
            formattedDexNum: `#${String(index + 1).padStart(4, "0")}`,
            disabled: false,
            color: colors.offWhite,
        };
    }));
    const [dexNumRange, setDexNumRange] = useState({ start: 1, end: 1008 });
    const [score, setScore] = useState(0);
    const [answersRevealed, setAnswersRevealed] = useState(false);
    const totalPoints = dexNumRange.end - dexNumRange.start + 1;
    const updatePokemonInputProps = (key, value, index) => setPokemonInputProps((prev) => {
        const newPokemonInputProps = [...prev];
        newPokemonInputProps[index][key] = value;
        return newPokemonInputProps;
    });
    const incrementScore = () => setScore((prev) => prev + 1);

    function checkAnswer(userAnswer, correctAnswer) {
        return userAnswer === correctAnswer;
    }

    function handleAnswerChange(newValue, index, correctAnswer) {
        updatePokemonInputProps("value", newValue, index);

        const correct = checkAnswer(newValue, correctAnswer);
        if (correct) {
            inputRefs?.[index + 1]?.current?.focus();
            updatePokemonInputProps("disabled", true, index);
            updatePokemonInputProps("color", colors.green, index);
            incrementScore();
        }
    }

    function resetQuiz() {
        setPokemonInputProps(
            pokemonInputProps.map((props) => {
                return { ...props, value: "", disabled: false, color: colors.offWhite };
            })
        );
        setScore(0);
        setAnswersRevealed(false);
    }

    function revealAnswers() {
        setPokemonInputProps(
            pokemonInputProps.map((props) => {
                return {
                    ...props,
                    value: props.answer,
                    disabled: true,
                    color: props.value === props.answer ? colors.green : colors.red
                };
            })
        );
        setAnswersRevealed(true);
    }

    useEffect(() => {
        resetQuiz();
    }, [dexNumRange]);

    return (
        <div className={styles.pokemonList}>
            <h1>Pokédex Quiz</h1>
            <DexNumRangeSelector onChange={(range) => setDexNumRange(range)} />
            {pokemonInputProps.map((props, index) => {
                if (props.dexNum >= dexNumRange.start && props.dexNum <= dexNumRange.end)
                    return (
                        <span key={props.dexNum} style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
                            {props.formattedDexNum}
                            <input
                                value={props.value}
                                ref={inputRefs[index]}
                                className={styles.input}
                                style={{ color: props.color }}
                                onChange={(e) => handleAnswerChange(e.target.value, index, props.answer)}
                                disabled={props.disabled}
                            />
                        </span>
                    );
            })}
            <div className={styles.score}>
                <span>{score}/{totalPoints}</span>
                <span className={styles.btns}>
                    <button className={styles.btn} onClick={resetQuiz}>Reset</button>
                    <button className={styles.btn} onClick={revealAnswers} disabled={answersRevealed}>Reveal</button>
                </span>
            </div>
        </div>
    );
}

const useStyles = createUseStyles({
    pokemonList: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: ".5rem",
        paddingBlock: "7.5rem",
    },
    input: {
        fontSize: "1rem",
        color: ({ colors }) => colors.offWhite,
        width: "16rem",
        backgroundColor: "transparent",
        borderRadius: 5,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: ({ colors }) => colors.darkGray,
    },
    score: {
        width: "100%",
        fontSize: "2rem",
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: ".5rem",
        bottom: 0,
        padding: "1rem",
        backgroundColor: ({ colors }) => colors.black
    },
    btn: {
        width: "7.5rem"
    },
    btns: {
        display: "flex",
        flexDirection: "row",
        gap: ".5rem",

    }
});