import { Box } from "@mui/material"
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { PinInput } from "../components/base/input/pin-input";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {

    const navigate = useNavigate();
    const [gamePin, setGamePin] = useState("");

    function generateRandomGamePin(): string {
        const values = new Uint32Array(1);
        globalThis.crypto.getRandomValues(values);
        return (1111 + values[0] % 8888).toString();
    }

    function handleNavigate() {
        navigate(`/game/${generateRandomGamePin()}`);
    }

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '100vh', px: 2, boxSizing: 'border-box'}}>
            <title>Home</title>
            <Box component="h1" sx={{fontSize: {xs: '2rem', sm: '2.5rem'}, fontWeight: 'bold', lineHeight: 1.2, m: 0, mb: 3, textAlign: 'center'}}>
                Welcome!
            </Box>
            <Box sx={{m: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: 'min(100%, 24rem)'}}>
                <Box component="h2" sx={{fontSize: '1.25rem', fontWeight: 'semi-bold', lineHeight: 1.4, m: 0, mb: 2}}>
                    Enter game code
                </Box>
                <PinInput>
                    <PinInput.Label>Secure code</PinInput.Label>
                    <PinInput.Group
                        maxLength={4}
                        pattern={REGEXP_ONLY_DIGITS}
                        value={gamePin}
                        onChange={setGamePin}
                    >
                        <PinInput.Slot index={0} />
                        <PinInput.Slot index={1} />
                        <PinInput.Slot index={2} />
                        <PinInput.Slot index={3} />
                    </PinInput.Group>
                    <PinInput.Description>Ask your host for a code</PinInput.Description>
                </PinInput>
                <Button
                    sx={{mt: 2}}
                    variant="contained"
                    disabled={gamePin.length !== 4}
                    onClick={() => navigate(`/game/${gamePin}`)}
                >
                    Join
                </Button>
            </Box>
            <Button sx={{m: 5, position: 'fixed', right: 3, bottom: 3, zIndex: 1}} variant="contained" onClick={handleNavigate}>Create Game</Button>
        </Box>

    )
}
export default Home