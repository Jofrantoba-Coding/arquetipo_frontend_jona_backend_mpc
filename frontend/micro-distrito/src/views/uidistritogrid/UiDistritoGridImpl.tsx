import { getDistritos } from "../../services/api-mantenimientos/distrito";
import UiDistritoGrid from "./UiDistritoGrid";
import { UiDistritoGridProps } from "./UiDistritoGridProps";

export class UiDistritoGridImpl extends UiDistritoGrid {
    constructor(props: UiDistritoGridProps) {
        super(props);
        this.loadingData = this.loadingData.bind(this);
    }

    loadingData = async (page: number = 1) => {
        if (this.state.isLoading) return;
        this.setState({ isLoading: true });
        try {
            const data = await getDistritos(10, page * 10);
            console.log('handleScroll', page)
            console.log('distritos', data)
            this.setState(prevState => ({
                distritos: [...prevState.distritos, ...data],
                currentPage: prevState.currentPage + 1,
                isLoading: false
            }));
        } catch (error) {
            console.error("Error fetching data:", error);
            this.setState({ isLoading: false });
        }
    }

    componentDidMount() {
        this.loadingData?.(0);
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
            distritos={this.state.distritos}
            currentPage={this.state.currentPage} 
          />
        );
      }
}