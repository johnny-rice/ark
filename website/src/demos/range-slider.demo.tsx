import { Slider, type SliderProps } from '~/components/ui/slider'

export const Demo = (props: SliderProps) => {
  return (
    <Slider
      defaultValue={[33, 66]}
      marks={[
        { value: 25, label: '25' },
        { value: 50, label: '50' },
        { value: 75, label: '75' },
      ]}
      {...props}
    />
  )
}
