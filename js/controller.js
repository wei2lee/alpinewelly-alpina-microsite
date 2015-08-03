function MainCtrl($timeout) {
    $(document).ready(function () {
        $timeout(function () {
            console.log($('.fancybox').length);
            $('.fancybox').fancybox();
        })
    });
}

function HomeCtrl($timeout, $element) {
    
}

function LocationCtrl($timeout, $element) {
    var _this = this;
    _this.tabIndex = 0;
}

function RegistrationCtrl($timeout, $element) {
    $(document).ready(function () {

        $timeout(function () {
            $($element).find('.date').datepicker({
                endDate: new Date(),
                startView: "decade",
                autoclose: true,
                format: "dd MM yyyy"
            });
            $($element).find('select:not([disable-search])').select2({
                theme: "classic"
            });
            $($element).find('select[disable-search]').select2({
                minimumResultsForSearch: -1,
                theme: "classic"
            });
            $($element).find('.fancybox').fancybox();

            $form = $($element).find('.form-register-1');

            $form.bootstrapValidator({
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    name: {
                        validators: {
                            notEmpty: {
                                message: 'Name must not empty'
                            }
                        }
                    },
                    email: {
                        validators: {
                            notEmpty: {
                                message: 'The email address is required'
                            },
                            emailAddress: {
                                message: 'The email address is not valid'
                            }
                        }
                    },
                    mobile: {
                        validators: {
                            notEmpty: {
                                message: 'The mobile is required'
                            }
                        }
                    },
                    address: {
                        validators: {
                            notEmpty: {
                                message: 'The address is required'
                            }
                        }
                    },
                    'tnc-agreement': {
                        validators: {
                            choice: {
                                min: 1,
                                max: 1,
                                message: 'You must agree the disclamer'
                            }
                        }
                    }
                }
            }).on('error.form.bv', function (e) {}).on('success.form.bv', function (e) {
                e.preventDefault();
                var $form = $(e.target);
                var $bv = $form.data('bootstrapValidator');
                var $bb = bootbox.dialog({
                    closeButton: false,
                    message: 'Sending enquiry...'
                });
                $.ajax({
                    url: $form.attr('action'),
                    type: 'POST',
                    dataType: 'json',
                    data: $form.serialize(),
                }).done(function (data, textStatus, jqXHR) {
                    //error handling reported from server side
                    if (data.error_exist) {
                        $bb = bootbox.dialog({
                            closeButton: false,
                            message: 'The registration is failed, please try again later.' + '<br>Following error is occurred:' + data.error_message,
                            buttons: {
                                'Close': {
                                    callback: function () {
                                        bootbox.hideAll();
                                    }
                                }
                            }
                        });
                        $form.data('bootstrapValidator').disableSubmitButtons(false);
                        return;
                    }
                    //google analytics track registration form submit
                    ga('send', 'event', {
                        eventCategory: 'registration',
                        eventAction: 'registration'
                    });

                    //thank dialog
                    $bb = bootbox.dialog({
                        closeButton: false,
                        message: 'The registration is successed.',
                        buttons: {
                            'Close': {
                                callback: function () {
                                    bootbox.hideAll();
                                    $form.trigger('reset');
                                    $bv.resetForm(true);
                                }
                            }
                        }
                    });
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    $bb = bootbox.dialog({
                        closeButton: false,
                        message: 'The registration is failed, please try again later.' +
                            '<br>Following error is occurred : ' + errorThrown +
                            '<br>Server response : ' + jqXHR.responseText,
                        buttons: {
                            'Close': {
                                callback: function () {
                                    bootbox.hideAll();
                                }
                            }
                        }
                    });
                    $form.data('bootstrapValidator').disableSubmitButtons(false);
                });
            }).on('error.field.bv', function (e, data) {}).on('success.field.bv', function (e, data) {});
            $form.find('[type=reset]').click(function () {
                $('.form-register-1').data('bootstrapValidator').resetForm();
                $("select").each(function () {
                    $(this).select2("val", "");
                });
            });


        });
    });
}





angular.module('alpina')
    .controller('HomeCtrl', HomeCtrl)
    .controller('MainCtrl', MainCtrl)
    .controller('LocationCtrl', LocationCtrl)
    .controller('RegistrationCtrl', RegistrationCtrl);