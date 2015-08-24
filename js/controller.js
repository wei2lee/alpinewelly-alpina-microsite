function MainCtrl($timeout, $state, $rootScope) {
    $rootScope.$state = $state;
    $(document).ready(function () {
        $timeout(function () {
            console.log($('.fancybox').length);
            $('.fancybox').fancybox();
        })
    });
}

function IntroCtrl() {
    $(document).ready(function() {
        var videobackground = new $.backgroundVideo($('#background-video'), {
          "align": "centerXY",
          "width": 1920,
          "height": 1080,
          "path": "assets/video/",
          "filename": "Alpina Website Intro",
          "types": ["mp4","ogg","webm"],
          "preload": true,
          "autoplay": true,
          "loop": false
        });
        
//         $('#background-video').get(0).addEventListener("ended", function () {
//             console.log("the video is end");
//             this.stop();
//         }, false);
    });
}

function HomeCtrl($timeout, $element) {
    
}

function ProjectFloorplanCtrl($timeout, $scope) {
    var _this = this;
    var slides = this.slides = [];
    for(i = 0 ; i < 5 ; i++) {
        var typechar = String.fromCharCode(97 + i);
        
        var slide = {
            imgs: [
                'img/project-floorplan-type-'+typechar+'-floorplan-01@2x.png',
                'img/project-floorplan-type-'+typechar+'-floorplan-02@2x.png',
                'img/project-floorplan-type-'+typechar+'-floorplan-03@2x.png'
            ],
            sidebarimg:'img/project-floorplan-type-'+typechar+'-title@2x.png',
            type:String.fromCharCode(65 + i)
        };
        slides.push(slide);
    }
    this.activeSlide = 0;
    
    this.sidebarimg = function() {
        var i = 0;
        for(k in slides) {
            if(slides[k].active) {
                i = k;
                break;   
            }
        }
        return slides[i].sidebarimg;   
    }
    
//    $('.carousel').carousel()
    
    $(document).ready(function() {
       $('.fancybox').fancybox(); 
    });
    
    this.selectSlide = function(index) {
        for(i = 0 ; i < slides.length ; i++) {
            slides[i].active = i == index;
        }
    }
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
    .controller('MainCtrl', MainCtrl)
    .controller('IntroCtrl', IntroCtrl)
    .controller('HomeCtrl', HomeCtrl)
    .controller('ProjectFloorplanCtrl', ProjectFloorplanCtrl)
    .controller('LocationCtrl', LocationCtrl)
    .controller('RegistrationCtrl', RegistrationCtrl);