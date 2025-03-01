import styles from "./Spacer.module.css";

type SpacerProps = {
  onClick: () => void;
  showHint: boolean;
};

export const Spacer = ({ onClick, showHint }: SpacerProps) => {
  return (
    <div className={styles.spacer} onClick={onClick}>
      {showHint && "Click to add first block"}
    </div>
  );
};
