import { getDistritos } from "../../services/api-mantenimientos/distrito";
import UiDistritoGrid from "./UiDistritoGrid";
import { UiDistritoGridProps } from "./UiDistritoGridProps";

export class UiDistritoGridImpl extends UiDistritoGrid {
    constructor(props: UiDistritoGridProps) {
        super(props);
        this.loadingData = this.loadingData.bind(this);
    }

    async loadingData(page: number = 0) {
        if (this.state.isLoading) return;

        this.setState({ isLoading: true });

        try {
            const data = await getDistritos(10, page * 10);
            this.setState(prevState => ({
                distritos: page === 0 ? data : [...prevState.distritos, ...data],
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
        return super.render();
    }
}