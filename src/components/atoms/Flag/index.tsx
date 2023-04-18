import "./styles.css";

type FlagProps = {
  image: any;
  isSelected: boolean;
  onClick: any
};

const Flag = ({ image, isSelected, ...props }: FlagProps) => (
  <img
    alt="flag"
    src={image}
    className={isSelected ? "flag selected" : "flag"}
    {...props}
  />
);

export default Flag;
