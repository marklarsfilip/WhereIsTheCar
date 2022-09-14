import renderer from 'react-test-renderer';
import CarStatus from '../components/modules/CarStatus';

const mockItem = { available: false, dateTime: 1663153885861 }

it('displays the passed data as status-card', () => {
    const component = renderer.create(
        <CarStatus status={mockItem} />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});