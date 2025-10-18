import { RadioGroup, RadioGroupItem } from "../../../shared/components/RadioGroup";
import { Label } from "../../../shared/components/Label";
import { GameMode, BotDifficulty } from "../types";

interface ModeSelectorProps {
  mode: GameMode;
  difficulty: BotDifficulty;
  onModeChange: (mode: GameMode) => void;
  onDifficultyChange: (difficulty: BotDifficulty) => void;
}

const ModeSelector = ({
  mode,
  difficulty,
  onModeChange,
  onDifficultyChange,
}: ModeSelectorProps) => {
  return (
    <div className="mode-selector">
      <h3 className="mode-title">Game Mode</h3>

      <RadioGroup
        value={mode}
        onValueChange={onModeChange}
        className="mode-options"
      >
        <div className="mode-option">
          <RadioGroupItem value="player" id="player" />
          <Label htmlFor="player">VS Player</Label>
        </div>
        <div className="mode-option">
          <RadioGroupItem value="bot" id="bot" />
          <Label htmlFor="bot">VS Bot</Label>
        </div>
      </RadioGroup>

      {mode === "bot" && (
        <div className="difficulty-selector">
          <h4 className="difficulty-title">Difficulty</h4>
          <RadioGroup
            value={difficulty}
            onValueChange={onDifficultyChange}
            className="difficulty-options"
          >
            <div className="mode-option">
              <RadioGroupItem value="easy" id="easy" />
              <Label htmlFor="easy">Easy</Label>
            </div>
            <div className="mode-option">
              <RadioGroupItem value="hard" id="hard" />
              <Label htmlFor="hard">Hard</Label>
            </div>
          </RadioGroup>
        </div>
      )}
    </div>
  );
};

export default ModeSelector;