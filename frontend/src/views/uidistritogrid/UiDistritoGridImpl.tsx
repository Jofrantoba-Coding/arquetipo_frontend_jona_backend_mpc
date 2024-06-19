import { getDistritos } from "../../services/api-mantenimientos/distrito";
import UiDistritoGrid from "./UiDistritoGrid";
import { UiDistritoGridProps } from "./UiDistritoGridProps";

export class UiDistritoGridImpl extends UiDistritoGrid {
    constructor(props: UiDistritoGridProps) {
        super(props);
        this.loadingData = this.loadingData.bind(this);
    }

    loadingData = async (page: number = 1) => {
        console.log('loading data')
        if (this.state.isLoading) return;
        console.log('loading data 2')

        this.setState({ isLoading: true });
        console.log('loading data 3')

        try {
            console.log('loading data 4')

            const data = await getDistritos(10, page * 10);
            console.log('distritos', data)
            this.setState(prevState => ({
                distritos: [...prevState.distritos, ...data],
                currentPage: page,
                isLoading: false
            }));
        } catch (error) {
            console.error("Error fetching data:", error);
            this.setState({ isLoading: false });
        }
    }

    componentDidMount() {
        this.loadingData();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        return (
          <UiDistritoGrid
            {...this.props}
            loadingData={this.loadingData}
          />
        );
      }
}