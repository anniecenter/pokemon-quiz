import { useState, useEffect } from 'react';
import { createUseStyles } from "react-jss";
import { colors } from "../constants/colors";

export default function DexNumRangeSelector({ onChange }) {
    const styles = useStyles({ colors });

    const [dexNumRange, setDexNumRange] = useState({ start: 1, end: 1008 });
    const setStart = (e) => setDexNumRange((prev) => ({ ...prev, start: Number(e.target.value) }));
    const setEnd = (e) => setDexNumRange((prev) => ({ ...prev, end: Number(e.target.value) }));

    useEffect(() => {
        onChange?.(dexNumRange);
    }, [dexNumRange]);

    return (
        <div className={styles.container}>
            <select className={styles.input} defaultValue={1} onChange={setStart}>
                <option value={1}>Gen 1</option>
                <option value={152}>Gen 2</option>
                <option value={252}>Gen 3</option>
                <option value={387}>Gen 4</option>
                <option value={494}>Gen 5</option>
                <option value={650}>Gen 6</option>
                <option value={722}>Gen 7</option>
                <option value={810}>Gen 8</option>
                <option value={906}>Gen 9</option>
            </select>
            to
            <select className={styles.input} defaultValue={1008} onChange={setEnd}>
                <option value={151}>Gen 1</option>
                <option value={251}>Gen 2</option>
                <option value={386}>Gen 3</option>
                <option value={493}>Gen 4</option>
                <option value={649}>Gen 5</option>
                <option value={721}>Gen 6</option>
                <option value={809}>Gen 7</option>
                <option value={905}>Gen 8</option>
                <option value={1008}>Gen 9</option>
            </select>
        </div>
    );
}

const useStyles = createUseStyles({
    container: {
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        alignItems: "center"
    },
    input: {
        fontSize: "1rem",
        color: ({ colors }) => colors.offWhite,
        width: "7.5rem",
        backgroundColor: ({ colors }) => colors.nearBlack,
        borderRadius: 5,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: ({ colors }) => colors.darkGray,
    },
});