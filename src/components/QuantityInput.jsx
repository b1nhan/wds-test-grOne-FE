import { useState, useEffect, useRef } from 'react';
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
  const [quantity, setQuantity] = useState(value);

  const handleValueChange = (newValue) => {
    setQuantity(newValue);
    onChange?.(newValue);
  };

  return (
    <ButtonGroup>
      <Button
        type="button"
        size="icon"
        variant="outline"
        onClick={() => handleValueChange(Math.max(0, quantity - 1))}
      >
        <MinusIcon />
      </Button>

      <Input
        type="number"
        value={quantity}
        onChange={(e) => handleValueChange(clamp(e.target.value, min, max))}
        className="w-12 text-center"
        min={min}
        max={max}
      />

      <Button
        type="button"
        size="icon"
        variant="outline"
        onClick={() => handleValueChange(Math.min(quantity + 1, max))}
      >
        <PlusIcon />
      </Button>
    </ButtonGroup>
  );
};

export default QuantityInput;
