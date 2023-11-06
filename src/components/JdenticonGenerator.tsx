import jdenticon from "jdenticon/standalone";
import { useEffect, useRef } from "react";

interface JdenticonGeneratorProps {
  value: string;
}

const JdenticonGenerator = ({ value }: JdenticonGeneratorProps) => {
  const iconRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (iconRef.current) {
      jdenticon.update(iconRef.current, value);
    }
  }, [value]);

  return <svg ref={iconRef} style={{ display: "block" }} />;
};

export default JdenticonGenerator;
