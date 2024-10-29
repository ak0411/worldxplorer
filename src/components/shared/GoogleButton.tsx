import { Button } from '../ui/button';

type GoogleButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

export default function GoogleButton({
  onClick,
  children,
  disabled,
}: GoogleButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="rounded-[2px] bg-[#444] text-[#b3b3b3] transition-all hover:bg-[#444] hover:text-[#ffffff]"
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
