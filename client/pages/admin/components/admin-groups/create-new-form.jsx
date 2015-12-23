'use strict';
const React = require('react');
const Modal = require('../../../../components/modal');
const ControlGroup = require('../../../../components/form/control-group');
const TextControl = require('../../../../components/form/text-control');
const Button = require('../../../../components/form/button');
const Spinner = require('../../../../components/form/spinner');
const Actions = require('../../actions/admin-group');


const contextTypes = {
    location: React.PropTypes.object
};
const propTypes = {
    data: React.PropTypes.object
};
const defaultProps = {
    data: {
        hasError: {},
        help: {}
    }
};


class Component extends React.Component {
    constructor(props) {

        super(props);

        this.state = {};
    }

    componentWillUnmount() {

        clearTimeout(this.timeout);
    }

    componentWillReceiveProps(nextProps) {

        if (!nextProps.data.show) {
            this.replaceState({});
        }
        else {
            this.timeout = setTimeout(() => {

                this.refs.name.refs.inputField.focus();
            }, 100);
        }
    }

    onSubmit(event) {

        event.preventDefault();
        event.stopPropagation();

        Actions.createNew({
            name: this.state.name
        }, this.context.location);
    }
    render() {

        let alerts;

        if (this.props.data.error) {
            alerts = <div className="alert alert-danger">
                {this.props.data.error}
            </div>;
        }

        let notice;

        if (this.props.data.success) {
            notice = <div className="alert alert-success">
                Loading data...
            </div>;
        }

        let formElements;

        if (!this.props.data.success) {
            formElements = <fieldset>
                {alerts}
                <TextControl
                    name="name"
                    ref="name"
                    label="Name"
                    hasError={this.props.data.hasError.name}
                    valueLink={this.linkState('name')}
                    help={this.props.data.help.name}
                    disabled={this.props.data.loading}
                />
                <ControlGroup hideLabel={true} hideHelp={true}>
                    <Button
                        type="submit"
                        inputClasses={{ 'btn-primary': true }}
                        disabled={this.props.data.loading}>

                        Create new
                        <Spinner space="left" show={this.props.data.loading} />
                    </Button>
                </ControlGroup>
            </fieldset>;
        }

        return (
            <Modal
                header="Create new"
                show={this.props.data.show}
                onClose={Actions.hideCreateNew}>

                <form onSubmit={this.onSubmit}>
                    {notice}
                    {formElements}
                </form>
            </Modal>
        );
    }
}

Component.contextTypes = contextTypes;
Component.propTypes = propTypes;
Component.defaultProps = defaultProps;


module.exports = Component;