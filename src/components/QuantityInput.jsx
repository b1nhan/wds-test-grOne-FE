import { useState, useEffect } from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { ButtonGroup } from './ui/button-group';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { clamp } from '@/lib/utils';

const QuantityInput = ({
  value = 0,
  onChange,
  min = -Infinity,
  max = Infinity,
}) => {
  const [quantiy, setQuantity] = useState(value);

  useEffect(() => {
    onChange?.(quantiy);
  }, [quantiy, onChange]);

  return (
    <ButtonGroup>
      <Button
        type="button"
        size="icon"
        variant="outline"
        onClick={() => setQuantity(Math.max(0, quantiy - 1))}
      >
        <MinusIcon />
      </Button>

      <Input
        type="number"
        value={quantiy}
        onChange={(e) => setQuantity(clamp(e.target.value, min, max))}
        className="w-12 text-center"
        min={min}
        max={max}
      />

      <Button
        type="button"
        size="icon"
        variant="outline"
        onClick={() => setQuantity(Math.min(quantiy + 1, max))}
      >
        <PlusIcon />
      </Button>
    </ButtonGroup>
  );
};

export default QuantityInput;
