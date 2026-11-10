import { useState } from "react"
import { BuzzerStatus, GameQuestion } from "../../types/game.types"
import { Box, Button, Typography } from "@mui/material"

export interface BuzzerProps {
    question: GameQuestion | null,
    status: BuzzerStatus
}

function Buzzer({question, status}: BuzzerProps) {
    const [isPressed, setIsPressed] = useState(false)

    return (
        <Box sx={{ textAlign: "center" }}>
            {status === BuzzerStatus.Active && question ? (
                <>
                    <Typography
                        variant="h2"
                        sx={{ fontSize: { xs: "3rem", sm: "4rem" }, mb: 3 }}
                    >
                        Go!
                    </Typography>
                    <Button
                        variant="contained"
                        onPointerDown={() => setIsPressed(true)}
                        onPointerUp={() => setIsPressed(false)}
                        onPointerLeave={() => setIsPressed(false)}
                        onPointerCancel={() => setIsPressed(false)}
                        sx={{
                            width: { xs: 200, sm: 240 },
                            height: { xs: 200, sm: 240 },
                            minWidth: 0,
                            borderRadius: "50%",
                            border: "8px solid #8b0000",
                            background: "linear-gradient(145deg, #ff5252, #d50000)",
                            color: "#fff",
                            fontSize: { xs: "2rem", sm: "2.5rem" },
                            fontWeight: 900,
                            letterSpacing: "0.08em",
                            textShadow: "0 2px 3px rgba(0, 0, 0, 0.35)",
                            touchAction: "manipulation",
                            transition: "transform 80ms ease, box-shadow 80ms ease",
                            transform: isPressed ? "translateY(12px)" : "translateY(0)",
                            boxShadow: isPressed
                                ? "0 4px 0 #8b0000, 0 8px 12px rgba(0, 0, 0, 0.3)"
                                : "0 12px 0 #8b0000, 0 18px 24px rgba(0, 0, 0, 0.35)",
                            "&:hover": {
                                background: "linear-gradient(145deg, #ff6b6b, #e00000)",
                            }
                        }}
                    >
                    </Button>
                </>
            ) : (
                <Typography
                    variant="h2"
                    sx={{ fontSize: { xs: "3rem", sm: "4rem" } }}
                >
                    Wait...
                </Typography>
            )}
        </Box>
    )
}
export default Buzzer