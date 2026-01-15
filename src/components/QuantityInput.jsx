import { useState, useEffect, useRef } from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { ButtonGroup } from './ui/button-group';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { clamp } from '@/lib/utils';

const QuantityInput = ({
  value = 1,
  onChange,
  min = -Infinity,
  max = Infinity,
}) => {
  const [quantity, setQuantity] = useState(value);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    onChange?.(quantity);
  }, [quantity, onChange]);

  return (
    <ButtonGroup>
      <Button
        type="button"
        size="icon"
        variant="outline"
        disabled={quantity <= min}
        onClick={() => setQuantity(Math.max(min, quantity - 1))}
      >
        <MinusIcon />
      </Button>

      <Input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(clamp(e.target.value, min, max))}
        className="w-12 text-center"
        min={min}
        max={max}
      />

      <Button
        type="button"
        size="icon"
        variant="outline"
        disabled={quantity >= max}
        onClick={() => setQuantity(Math.min(quantity + 1, max))}
      >
        <PlusIcon />
      </Button>
    </ButtonGroup>
  );
};

export default QuantityInput;
