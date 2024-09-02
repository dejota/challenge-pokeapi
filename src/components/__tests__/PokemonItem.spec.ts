import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import PokemonItem from '../PokemonItem.vue';

describe('PokemonItem', () => {
  it('should click and emit openModal', async () => {
    const wrapper = mount(PokemonItem, {
      props: {
        name: 'pikachu',
        isFav: false
      }
    })

    await wrapper.find('[data-test="emit-open-modal"]').trigger('click')
    expect(wrapper.emitted('openModal')).toHaveLength(1);
  });

  it('should render the correct name sent', () => {
    const wrapper = mount(PokemonItem, {
      props: {
        name: 'pikachu',
        isFav: false
      }
    })

    const nameElement = wrapper.find('[data-test="emit-open-modal"]')
    expect(nameElement.exists()).toBe(true)
    expect(nameElement.text()).toBe('pikachu')
  })

  it('should check if StarImage has fill-disabled class', () => {
    const wrapper = mount(PokemonItem, {
      props: {
        name: 'pikachu',
        isFav: false
      }
    })

    const starImage = wrapper.find('[data-test="star-image"]');
    expect(starImage.classes()).toContain('fill-disabled');
  })

  it('should check if StarImage has fill-favorite class', () => {
    const wrapper = mount(PokemonItem, {
      props: {
        name: 'pikachu',
        isFav: true
      }
    })

    const starImage = wrapper.find('[data-test="star-image"]');
    expect(starImage.classes()).toContain('fill-favorite');
  })
});
