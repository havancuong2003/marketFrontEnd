import clsx from "clsx";

export const InfoHero = ({ classes, styles }) => {
  return (
    <div
      className={clsx("bg-background h-[700px] w-[700px]", classes.container)}
      style={styles.container}
    >
      <div className="bg-carddetail w-[672px] h-[672px]"></div>
    </div>
  );
};
