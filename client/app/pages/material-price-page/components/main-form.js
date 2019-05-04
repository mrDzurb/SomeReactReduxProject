import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader';
import { diggitTomoneyStr, strToMomentDate } from 'services/routine';
import Styles from './styles';

const MainForm = (props) => (
  <div className="container">
    <div className="row">
      <div className="col-md-10 col-md-offset-1">
        <form className={`form-horizontal ${Styles.mainForm}`}>
          <SearchBox {...props} />
          <MessagesBox {...props} />
          <DataBox {...props} />
        </form>
      </div>
    </div>
    <Loader
      loaded={!props.loading}
      options={{
        length: 10,
        width: 8,
        radius: 20,
        color: '#000',
        trail: 40
      }}
      className={Styles.spinner}
    />
  </div>
);

MainForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.arrayOf(PropTypes.shape)
};

MainForm.defaultProps = {
  errors: []
};

const SearchBox = (props) => (
  <fieldset className={`${Styles.searchBox}`}>
    <legend>Заполните параметры поиска</legend>
    <div className="form-group">
      <div className="col-sm-4">
        <label
          className={`control-label col-sm-3 ${Styles.controlLabel}`}
          htmlFor="tbOrderNumber"
        >
          <strong>Заказ:</strong>
        </label>
        <div className="col-sm-8">
          <input
            id="tbOrderNumber"
            className="form-control"
            placeholder="1313.1.1"
            type="text"
            value={props.search_order_number}
            onChange={(e) => {
              props.setData({ search_order_number: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="col-sm-5">
        <label
          className={`control-label col-sm-4 ${Styles.controlLabel}`}
          htmlFor="tbMaterialKey"
        >
          <strong>Материал:</strong>
        </label>
        <div className="col-sm-7">
          <input
            id="tbMaterialKey"
            className="form-control"
            placeholder="9.11.4"
            type="text"
            value={props.search_material_key}
            onChange={(e) => {
              props.setData({ search_material_key: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="col-sm-3">
        <div className="pull-right">
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginRight: '20px' }}
            disabled={props.loading ? true : false}
            onClick={() => {
              props.getData();
            }}
          >
            Показать
          </button>
        </div>
      </div>
    </div>
  </fieldset>
);

SearchBox.propTypes = {
  setData: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  search_order_number: PropTypes.string.isRequired,
  search_material_key: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

const DataBox = (props) => (
  <div className={`row ${Styles.dataBox}`}>
    <div className="col-sm-12">
      <div className="row">
        <MaterialInfoItem header="Плановая цена материала" data={props.plan} />
        <MaterialInfoItem
          header="Фактическая цена материала"
          data={props.fact}
        />
      </div>
    </div>
  </div>
);

DataBox.propTypes = {
  plan: PropTypes.objectOf(PropTypes.shape),
  fact: PropTypes.objectOf(PropTypes.shape)
};

DataBox.defaultProps = {
  plan: {},
  fact: {}
};

const MaterialInfoItem = ({ header, data }) => (
  <div
    className="col-sm-6"
    style={data && data.price > 0 ? {} : { display: 'none' }}
  >
    <div className="col-md-12">
      <div className={`form-horizontal ${Styles.mainForm}`}>
        <fieldset>
          <legend>
            <small>{header}</small>
          </legend>
          <div className="form-group">
            <span className={`col-sm-4 ${Styles.controlLabel}`}>Документ:</span>
            <div className={`col-sm-8 ${Styles.lightBorder}`}>
              {data.account}&nbsp;
            </div>
          </div>
          <div className="form-group">
            <span className={`col-sm-4 ${Styles.controlLabel}`}>Цена:</span>
            <div className={`col-sm-8 ${Styles.lightBorder}`}>
              {diggitTomoneyStr(data.price)}&nbsp;
            </div>
          </div>
          <div className="form-group">
            <span className={`col-sm-4 ${Styles.controlLabel}`}>Дата:</span>
            <div className={`col-sm-8 ${Styles.lightBorder}`}>
              {data.date
                ? strToMomentDate(data.date, 'YYYY-MM-DDTHH:mm').format(
                    'DD.MM.YYYY'
                  )
                : ''}
              &nbsp;
            </div>
          </div>
          <div className="form-group">
            <span className={`col-sm-4 ${Styles.controlLabel}`}>
              Код товара:
            </span>
            <div className={`col-sm-8 ${Styles.lightBorder}`}>
              {data.good_code_1c}&nbsp;
            </div>
          </div>
          <div className="form-group">
            <span className={`col-sm-4 ${Styles.controlLabel}`}>
              Коэффициент:
            </span>
            <div className={`col-sm-8 ${Styles.lightBorder}`}>
              {data.coef_si_div_iu}&nbsp;
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
);

MaterialInfoItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.shape),
  header: PropTypes.string,
  name: PropTypes.string,
  code: PropTypes.string
};

MaterialInfoItem.defaultProps = {
  data: {},
  header: '',
  name: '',
  code: ''
};

const MessagesBox = (props) => (
  <div className={`formGroup ${Styles.messageBox}`}>
    <div className="col-sm-12">
      <div
        className="alert alert-danger"
        role="alert"
        style={props.errors.length > 0 ? {} : { display: 'none' }}
      >
        {props.errors.map((err) => (
          <div key={err.key}>
            <strong>{err.header}</strong> {err.msg}
          </div>
        ))}
      </div>
    </div>
  </div>
);

MessagesBox.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.shape)
};
MessagesBox.defaultProps = {
  errors: []
};

export default MainForm;
