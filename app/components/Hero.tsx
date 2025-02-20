import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNewspaper,
  faUserTie,
  faArrowRight,
} from "@fortawesome/pro-regular-svg-icons";

export default function Hero() {
  return (
    <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-6">
      <h1 className="flex flex-wrap items-center justify-center gap-3 text-3xl font-mono font-bold text-nowrap text-muted leading-3">
        <span>Get</span>
        <span className="text-content gap-3 flex items-center">
          daily briefs
          <FontAwesomeIcon icon={faNewspaper} />
        </span>
        <span>like you&apos;re</span>
        <span className="gap-3 flex items-center">
          the president
          <FontAwesomeIcon icon={faUserTie} />
        </span>
      </h1>

      <p className="text-muted font-mono ">
        &gt;&gt; customize ai-generated newsletters
      </p>

      <a
        href="#"
        className="inline-flex w-fit items-center gap-3 px-6 py-3 text-content bg-base-200 hover:bg-base-300 rounded-full transition-colors"
      >
        Get started
        <FontAwesomeIcon icon={faArrowRight} />
      </a>
    </div>
  );
}
