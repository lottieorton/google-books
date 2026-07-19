import classes from "./ResultsIssues.module.scss";

export default function ResultsIssues({ children, header, text, type }) {
  const sectionClass = classes[`section_${type}`] || "";
  return (
    <article
      className={`${classes.section} ${sectionClass}`}
      data-testId={type}
    >
      {children}
      <h2 className={classes.header}>{header}</h2>
      <p className={classes.text}>{text}</p>
    </article>
  );
}
