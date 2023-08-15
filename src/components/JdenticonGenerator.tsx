import jdenticon from "jdenticon/standalone";
import { useEffect, useRef } from "react";
import { JdenticonGeneratorProps } from "../types";

const JdenticonGenerator = ({ value }: JdenticonGeneratorProps) => {
  const iconRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (iconRef.current) {
      jdenticon.update(iconRef.current, value, {padding: 0});
    }
  }, [value]);

  return <svg ref={iconRef}  />;
};

export default JdenticonGenerator;
