import { createUseStyles } from "react-jss";
import { colors } from "./constants/colors";
import PokemonList from "./components/PokemonList";

function App() {
    const styles = useStyles({ colors });

    return (
        <div className={styles.app}>
            <PokemonList />
        </div>
    );
}

const useStyles = createUseStyles({
    app: {
        height: "100%",
        color: ({ colors }) => colors.offWhite,
        backgroundColor: ({ colors }) => colors.nearBlack,
    }
});

export default App;
