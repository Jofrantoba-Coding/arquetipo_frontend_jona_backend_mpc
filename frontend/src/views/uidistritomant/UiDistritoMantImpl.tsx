import { getProvinciaByIdDepartamento } from "../../services/api-mantenimientos/provincia";
import UiDistritoMant from "./UiDistritoMant";
import { UiDistritoMantProps } from "./UiDistritoMantProps";

export class UiDistritoMantImpl extends UiDistritoMant {
    constructor(props: UiDistritoMantProps) {
        super(props);
        this.loadingData = this.loadingData.bind(this);
      }

    async loadingData() {
        const dataProvincia = await getProvinciaByIdDepartamento(Number(this.props.data?.iddepartamento));
        this.setState({ provincias: dataProvincia });
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
    static defaultProps: Partial<UiDistritoMantProps> = {
        loadingData: UiDistritoMantImpl.prototype.loadingData
      };
}
