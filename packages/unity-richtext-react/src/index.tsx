import colorToHex from "./utils/colors";

type UnityRichTextProps = {
  children: string;
};

const UnityRichTextComponent = ({ children }: UnityRichTextProps) => {
  return (
    <span className="whitespace-pre-wrap">{parseCustomTemplate(children)}</span>
  );
};
export default UnityRichTextComponent;

// Helper function to parse a color tag
const parseColorTag = (attr: string | undefined) => {
  const match = attr?.match(/=([^>]+)/);
  return match ? colorToHex(match[1]!) : "inherit";
};

// Main parsing function
const parseCustomTemplate = (input: string) => {
  const tagRegex = /<(?<tag>\w+)(?<attr>[^>]*)>(?<content>.*?)<\/\1>/gs;
  const components = [];

  let match;
  let lastIndex = 0;

  while ((match = tagRegex.exec(input)) !== null) {
    const { tag: _tag, attr: _attr, content: _content } = match.groups!;
    const tag = _tag!;
    const attr = _attr!;
    const content = _content!;
    const beforeText = input.slice(lastIndex, match.index);

    // Push any plain text before the match
    if (beforeText) {
      components.push(beforeText);
    }

    // Handle supported tags
    switch (tag) {
      case "color":
        components.push(
          <span style={{ color: parseColorTag(attr) }}>{content}</span>
        );
        break;
      case "b":
        components.push(<b>{content}</b>);
        break;
      case "i":
        components.push(<i>{content}</i>);
        break;
      case "size":
        components.push(
          <span style={{ fontSize: `${content}px` }}>{content}</span>
        );
        break;
      default:
        // Fallback for unsupported tags
        components.push(content);
        break;
    }

    lastIndex = tagRegex.lastIndex;
  }

  // Push any remaining plain text after the last match
  if (lastIndex < input.length) {
    components.push(input.slice(lastIndex));
  }

  return components;
};
