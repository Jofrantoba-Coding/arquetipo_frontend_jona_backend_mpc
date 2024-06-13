import { getDistritos } from "../../services/api-mantenimientos/distrito";
import UiDistritoGrid from "./UiDistritoGrid";
import { UiDistritoGridProps } from "./UiDistritoGridProps";

export class UiDistritoGridImpl extends UiDistritoGrid {
    constructor(props: UiDistritoGridProps) {
        super(props);
        this.loadingData = this.loadingData.bind(this);
    }

    async loadingData(page: number = 0) {
        console.log('loading data')
        if (this.state.isLoading) return;

        this.setState({ isLoading: true });

        const data = await getDistritos(10, page * 10);
        this.setState(prevState => ({
            distritos: [...prevState.distritos, ...data],
            currentPage: page,
            isLoading: false
        }));
    }

    handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 100 && !this.state.isLoading) {
            this.loadingData(this.state.currentPage + 1);
        }
    }

    callbackModal = async () => {
        this.loadingData();
    }

    componentDidMount() {
        this.loadingData();
    }

    render() {
        return (
            <div>
                {super.render()}
            </div>
        );
    }
    static defaultProps: Partial<UiDistritoGridProps> = {
        loadingData: UiDistritoGridImpl.prototype.loadingData
    };

}
