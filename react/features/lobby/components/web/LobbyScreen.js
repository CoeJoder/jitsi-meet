// @flow

import React from 'react';

import { translate } from '../../../base/i18n';
import { ActionButton, InputField, PreMeetingScreen } from '../../../base/premeeting';
import { LoadingIndicator } from '../../../base/react';
import { connect } from '../../../base/redux';
import AbstractLobbyScreen, {
    _mapStateToProps
} from '../AbstractLobbyScreen';

/**
 * Implements a waiting screen that represents the participant being in the lobby.
 */
class LobbyScreen extends AbstractLobbyScreen {
    /**
     * Implements {@code PureComponent#render}.
     *
     * @inheritdoc
     */
    render() {
        return (
            <PreMeetingScreen title = { this.props.t(this._getScreenTitleKey()) }>
                { this._renderContent() }
            </PreMeetingScreen>
        );
    }

    _getScreenTitleKey: () => string;

    _onAskToJoin: () => boolean;

    _onCancel: () => boolean;

    _onChangeDisplayName: Object => void;

    _onChangeEmail: Object => void;

    _onChangePassword: Object => void;

    _onEnableEdit: () => void;

    _onJoinWithPassword: () => void;

    _onSubmit: () => boolean;

    _onSwitchToKnockMode: () => void;

    _onSwitchToPasswordMode: () => void;

    _renderContent: () => React$Element<*>;

    /**
     * Renders the joining (waiting) fragment of the screen.
     *
     * @inheritdoc
     */
    _renderJoining() {
        return (
            <div className = 'container'>
                <div className = 'spinner'>
                    <LoadingIndicator size = 'large' />
                </div>
                <span className = 'joining-message'>
                    { this.props.t('lobby.joiningMessage') }
                </span>
                { this._renderStandardButtons() }
            </div>
        );
    }

    /**
     * Renders the participant info fragment when we have all the required details of the user.
     *
     * @inheritdoc
     */
    _renderParticipantInfo() {
        const { displayName, email } = this.state;
        const { t } = this.props;

        return (
            <div className = 'participant-info'>
                <div className = 'form'>
                    <InputField
                        onChange = { this._onChangeDisplayName }
                        placeHolder = { t('lobby.nameField') }
                        value = { displayName } />

                    <InputField
                        onChange = { this._onChangeEmail }
                        placeHolder = { t('lobby.emailField') }
                        value = { email } />
                </div>
            </div>
        );
    }

    /**
     * Renders the password form to let the participant join by using a password instead of knocking.
     *
     * @inheritdoc
     */
    _renderPasswordForm() {
        const { _passwordJoinFailed, t } = this.props;

        return (
            <div className = 'form'>
                <InputField
                    className = { _passwordJoinFailed ? 'error' : '' }
                    onChange = { this._onChangePassword }
                    placeHolder = { _passwordJoinFailed ? t('lobby.invalidPassword') : t('lobby.passwordField') }
                    type = 'password'
                    value = { this.state.password } />
            </div>
        );
    }

    /**
     * Renders the password join button (set).
     *
     * @inheritdoc
     */
    _renderPasswordJoinButtons() {
        const { t } = this.props;

        return (
            <>
                <ActionButton
                    disabled = { !this.state.password }
                    onClick = { this._onJoinWithPassword }
                    type = 'primary'>
                    { t('lobby.passwordJoinButton') }
                </ActionButton>
                <ActionButton
                    onClick = { this._onSwitchToKnockMode }
                    type = 'secondary'>
                    { t('lobby.backToKnockModeButton') }
                </ActionButton>
            </>
        );
    }

    /**
     * Renders the standard button set.
     *
     * @inheritdoc
     */
    _renderStandardButtons() {
        const { _knocking, t } = this.props;

        return (
            <>
                { _knocking || <ActionButton
                    disabled = { !this.state.displayName }
                    onClick = { this._onAskToJoin }
                    type = 'primary'>
                    { t('lobby.knockButton') }
                </ActionButton> }
                <ActionButton
                    onClick = { this._onSwitchToPasswordMode }
                    type = 'secondary'>
                    { t('lobby.enterPasswordButton') }
                </ActionButton>
            </>
        );
    }
}

export default translate(connect(_mapStateToProps)(LobbyScreen));
